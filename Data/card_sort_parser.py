"""
Card Sort Data Parser
Processes card sort results from Excel file columns AL-YB (groups) and YC-YQ (group names).
"""

import pandas as pd
from pathlib import Path

# Get the directory where this script is located
SCRIPT_DIR = Path(__file__).parent
EXCEL_FILE = SCRIPT_DIR / "PSYC 409 Website Development Study_December 1, 2025_15.46.xlsx"
OUTPUT_FILE = SCRIPT_DIR / "CardSort.txt"

def column_letter_to_index(column_letter):
    """
    Convert Excel column letter(s) to zero-based index.
    Examples: A -> 0, Z -> 25, AA -> 26, AL -> 37
    Uses Excel's column numbering: A=1, B=2, ..., Z=26, AA=27, etc.
    """
    column_letter = column_letter.upper()
    result = 0
    for char in column_letter:
        result = result * 26 + (ord(char) - ord('A') + 1)
    return result - 1  # Convert to zero-based (Excel uses 1-based)

def parse_group_elements(text):
    """
    Parse a text response that may contain multiple elements separated by commas.
    Handles special element names that contain commas.
    Returns a list of cleaned elements.
    """
    if pd.isna(text) or text == '':
        return []
    
    # Convert to string and strip
    text = str(text).strip()
    
    if not text:
        return []
    
    # Special element names that contain commas - protect these before splitting
    special_names = [
        "Degrees, Majors, Minors, and Certificates Declared",
        "Register, Add, or Drop Classes"
    ]
    
    # Replace special names with placeholders before splitting
    placeholders = {}
    for i, special_name in enumerate(special_names):
        if special_name in text:
            placeholder = f"__SPECIAL_NAME_{i}__"
            text = text.replace(special_name, placeholder)
            placeholders[placeholder] = special_name
    
    # Split by comma and clean each element
    elements = [elem.strip() for elem in text.split(',')]
    
    # Restore special names from placeholders
    restored_elements = []
    for elem in elements:
        if elem in placeholders:
            restored_elements.append(placeholders[elem])
        else:
            restored_elements.append(elem)
    
    # Filter out empty strings
    elements = [elem for elem in restored_elements if elem and len(elem) > 0]
    
    return elements

def get_group_columns():
    """
    Get the column indices for group columns (AL-YB) and name columns (YC-YQ).
    Returns tuple of (group_start, group_end, name_start, name_end)
    """
    group_start = column_letter_to_index('AL')
    group_end = column_letter_to_index('YB')
    name_start = column_letter_to_index('YC')
    name_end = column_letter_to_index('YQ')
    
    return group_start, group_end, name_start, name_end

def process_participant(row_index, df, group_start, group_end, name_start, name_end):
    """
    Process a single participant's card sort data.
    Returns a list of groups, where each group is a dict with 'name' and 'elements'.
    """
    groups = []
    
    # Iterate through group columns (AL-YB) and corresponding name columns (YC-YQ)
    group_col_index = group_start
    name_col_index = name_start
    
    group_number = 1
    
    while group_col_index <= group_end and name_col_index <= name_end:
        # Get the group elements and name
        group_elements_text = df.iloc[row_index, group_col_index]
        group_name = df.iloc[row_index, name_col_index]
        
        # Parse elements
        elements = parse_group_elements(group_elements_text)
        
        # Get group name (handle NaN/empty)
        if pd.isna(group_name) or str(group_name).strip() == '':
            group_name = '___'
        else:
            group_name = str(group_name).strip()
        
        # Only add group if it has elements OR a non-empty name
        # (Skip completely blank groups, but include groups with just a name)
        has_elements = len(elements) > 0
        has_name = group_name != '___' and group_name.strip() != ''
        
        if has_elements or has_name:
            groups.append({
                'number': group_number,
                'name': group_name,
                'elements': elements
            })
            group_number += 1
        
        group_col_index += 1
        name_col_index += 1
    
    return groups

def main():
    """Main function to process card sort data and generate output file."""
    print(f"Reading Excel file: {EXCEL_FILE}")
    
    try:
        # Read the Excel file
        df = pd.read_excel(EXCEL_FILE, header=0)
        print(f"Successfully loaded {len(df)} rows and {len(df.columns)} columns")
        
        # Get column indices
        group_start, group_end, name_start, name_end = get_group_columns()
        
        print(f"Group columns: {group_start} to {group_end} (AL to YB)")
        print(f"Name columns: {name_start} to {name_end} (YC to YQ)")
        print(f"Total columns in file: {len(df.columns)}")
        
        # Verify we have enough columns
        max_needed = max(group_end, name_end)
        if max_needed >= len(df.columns):
            print(f"\nWARNING: Expected columns may be beyond available columns!")
            print(f"  Need up to column index {max_needed}, but only have {len(df.columns)} columns")
            print(f"  This might indicate the Excel file structure is different than expected.")
            print(f"  Attempting to process with available columns...")
            # Adjust ranges to fit available columns
            group_end = min(group_end, len(df.columns) - 1)
            name_end = min(name_end, len(df.columns) - 1)
            print(f"  Adjusted group columns: {group_start} to {group_end}")
            print(f"  Adjusted name columns: {name_start} to {name_end}")
        
        # Process each participant
        participants_data = []
        
        for row_index in range(3, len(df)):
            groups = process_participant(row_index, df, group_start, group_end, name_start, name_end)
            if groups:  # Only add participants who have at least one group
                participants_data.append({
                    'participant_number': row_index + 1,
                    'groups': groups
                })
        
        # Write results to file
        print(f"\nWriting card sort results to: {OUTPUT_FILE}")
        with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
            for participant in participants_data:
                f.write(f"Participant {participant['participant_number']}:\n")
                
                for group in participant['groups']:
                    f.write(f"    - Group {group['number']}: {group['name']}\n")
                    
                    # Write elements
                    if group['elements']:
                        for element in group['elements']:
                            f.write(f"        - {element}\n")
                    else:
                        # If no elements but group exists, still show it
                        pass
                
                f.write("\n")  # Blank line between participants
        
        print(f"Successfully processed {len(participants_data)} participants")
        print(f"Results written to: {OUTPUT_FILE}")
        
    except FileNotFoundError:
        print(f"Error: Excel file not found at {EXCEL_FILE}")
    except Exception as e:
        print(f"Error processing file: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    main()

