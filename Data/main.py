"""
Parsing script for Excel survey data.
Extracts and summarizes responses from specific columns.
"""

import pandas as pd
import re
from collections import Counter
from pathlib import Path

# Get the directory where this script is located
SCRIPT_DIR = Path(__file__).parent
EXCEL_FILE = SCRIPT_DIR / "PSYC 409 Website Development Study_December 1, 2025_15.46.xlsx"
OUTPUT_FILE = SCRIPT_DIR / "Summary.txt"

def parse_responses(text):
    """
    Parse a text response that may contain multiple items separated by commas, semicolons, or newlines.
    Returns a list of cleaned, individual items.
    """
    if pd.isna(text) or text == '':
        return []
    
    # Convert to string if not already
    text = str(text).strip()
    
    # Split by common delimiters (comma, semicolon, newline, or "and")
    # First, try splitting by newlines
    items = re.split(r'\n+', text)
    
    # Then split each item by comma or semicolon
    all_items = []
    for item in items:
        # Split by comma or semicolon
        sub_items = re.split(r'[,;]', item)
        for sub_item in sub_items:
            # Remove "and" at the beginning/end
            sub_item = re.sub(r'^\s*(and|&)\s+', '', sub_item, flags=re.IGNORECASE)
            sub_item = re.sub(r'\s+(and|&)\s*$', '', sub_item, flags=re.IGNORECASE)
            sub_item = sub_item.strip()
            if sub_item and len(sub_item) > 1:  # Filter out empty or single-character items
                all_items.append(sub_item)
    
    return all_items

def analyze_column(df, column_letter, question_text):
    """
    Analyze a specific column in the dataframe.
    Returns a tuple of (all_items, top_10_items)
    """
    # Convert column letter to index (T=19, W=22, Z=25)
    column_index = ord(column_letter.upper()) - ord('A')
    
    # Try to get column by index
    if column_index < len(df.columns):
        column_name = df.columns[column_index]
    else:
        print(f"Warning: Column {column_letter} (index {column_index}) not found.")
        print(f"Available columns: {list(df.columns)}")
        return [], []
    
    print(f"Processing column {column_letter} (index {column_index}): '{column_name}'...")
    
    # Get all non-null responses
    responses = df[column_name].dropna()
    
    # Parse all responses
    all_items = []
    for response in responses:
        items = parse_responses(response)
        all_items.extend(items)
    
    # Count occurrences
    item_counts = Counter(all_items)
    
    # Get top 10
    top_10 = item_counts.most_common(10)
    
    return all_items, top_10

def main():
    """Main function to process the Excel file and generate summary."""
    print(f"Reading Excel file: {EXCEL_FILE}")
    
    try:
        # Read the Excel file
        df = pd.read_excel(EXCEL_FILE)
        print(f"Successfully loaded {len(df)} rows and {len(df.columns)} columns")
        print(f"Column names: {list(df.columns)}")
        
        # Column mappings: T, W, Z
        columns_to_analyze = [
            ('T', 'What are the top things you typically use Esther for?'),
            ('W', 'Which features are hardest to find on Esther?'),
            ('Z', 'What were you trying to find, and what made it difficult?')
        ]
        
        results = {}
        
        # Analyze each column
        for col_letter, question_text in columns_to_analyze:
            all_items, top_10 = analyze_column(df, col_letter, question_text)
            results[question_text] = {
                'all_items': all_items,
                'top_10': top_10,
                'column': col_letter
            }
        
        # Write results to file
        print(f"\nWriting summary to: {OUTPUT_FILE}")
        with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
            f.write("=" * 80 + "\n")
            f.write("SURVEY DATA SUMMARY\n")
            f.write("=" * 80 + "\n\n")
            
            for question_text, data in results.items():
                f.write("-" * 80 + "\n")
                f.write(f"QUESTION: {question_text}\n")
                f.write(f"COLUMN: {data['column']}\n")
                f.write("-" * 80 + "\n\n")
                
                # Write all items
                f.write("ALL RESPONSES:\n")
                f.write("-" * 80 + "\n")
                if data['all_items']:
                    for item in data['all_items']:
                        f.write(f"  - {item}\n")
                else:
                    f.write("  (No responses found)\n")
                f.write("\n")
                
                # Write top 10 summary
                f.write("TOP 10 MOST COMMONLY LISTED ITEMS:\n")
                f.write("-" * 80 + "\n")
                if data['top_10']:
                    for i, (item, count) in enumerate(data['top_10'], 1):
                        f.write(f"  {i}. {item} (mentioned {count} time{'s' if count != 1 else ''})\n")
                else:
                    f.write("  (No items found)\n")
                f.write("\n\n")
        
        print("Summary file created successfully!")
        
        # Print summary to console as well
        print("\n" + "=" * 80)
        print("SUMMARY")
        print("=" * 80)
        for question_text, data in results.items():
            print(f"\n{question_text} (Column {data['column']}):")
            print(f"  Total items found: {len(data['all_items'])}")
            print(f"  Unique items: {len(set(data['all_items']))}")
            if data['top_10']:
                print("  Top 3:")
                for item, count in data['top_10'][:3]:
                    print(f"    - {item}: {count}")
        
    except FileNotFoundError:
        print(f"Error: Excel file not found at {EXCEL_FILE}")
    except Exception as e:
        print(f"Error processing file: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    main()

