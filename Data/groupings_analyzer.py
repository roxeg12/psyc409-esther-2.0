"""
Card Sort Groupings Analyzer
Analyzes card sort data to identify popular group names and element groupings.
"""

import pandas as pd
from collections import Counter, defaultdict
from pathlib import Path
from itertools import combinations

# Import functions from card_sort_parser
from card_sort_parser import (
    column_letter_to_index,
    parse_group_elements,
    get_group_columns,
    process_participant
)

# Get the directory where this script is located
SCRIPT_DIR = Path(__file__).parent
EXCEL_FILE = SCRIPT_DIR / "PSYC 409 Website Development Study_December 1, 2025_15.46.xlsx"
OUTPUT_FILE = SCRIPT_DIR / "Groupings.txt"

def analyze_group_names(participants_data):
    """
    Count occurrences of each unique group name (excluding "___").
    Returns a Counter sorted by count (descending).
    """
    group_name_counts = Counter()
    
    for participant in participants_data:
        for group in participant['groups']:
            group_name = group['name']
            if group_name != '___' and group_name.strip():
                group_name_counts[group_name] += 1
    
    return group_name_counts

def analyze_cooccurrence_pairs(participants_data):
    """
    Find all pairs of elements that appear together in groups.
    Returns a Counter of pairs (as tuples) sorted by count (descending).
    """
    pair_counts = Counter()
    
    for participant in participants_data:
        for group in participant['groups']:
            elements = group['elements']
            # Generate all pairs of elements within this group
            for pair in combinations(sorted(elements), 2):
                pair_counts[pair] += 1
    
    return pair_counts

def analyze_element_frequency(participants_data):
    """
    Count how many times each element appears in any group.
    Returns a Counter sorted by count (descending).
    """
    element_counts = Counter()
    
    for participant in participants_data:
        for group in participant['groups']:
            for element in group['elements']:
                element_counts[element] += 1
    
    return element_counts

def analyze_element_relationships(participants_data):
    """
    For each element, find all other elements it's been grouped with.
    Returns a dict mapping each element to a Counter of co-occurring elements.
    """
    element_relationships = defaultdict(Counter)
    
    for participant in participants_data:
        for group in participant['groups']:
            elements = group['elements']
            # For each element, count co-occurrences with other elements in the same group
            for element in elements:
                for other_element in elements:
                    if element != other_element:
                        element_relationships[element][other_element] += 1
    
    return element_relationships

def format_pair(pair):
    """Format a pair tuple for display."""
    return f"{pair[0]} + {pair[1]}"

def main():
    """Main function to analyze card sort data and generate summary."""
    print(f"Reading Excel file: {EXCEL_FILE}")
    
    try:
        # Read the Excel file
        df = pd.read_excel(EXCEL_FILE, header=0)
        print(f"Successfully loaded {len(df)} rows and {len(df.columns)} columns")
        
        # Get column indices
        group_start, group_end, name_start, name_end = get_group_columns()
        
        # Verify we have enough columns
        max_needed = max(group_end, name_end)
        if max_needed >= len(df.columns):
            print(f"\nWARNING: Expected columns may be beyond available columns!")
            print(f"  Need up to column index {max_needed}, but only have {len(df.columns)} columns")
            print(f"  Attempting to process with available columns...")
            group_end = min(group_end, len(df.columns) - 1)
            name_end = min(name_end, len(df.columns) - 1)
        
        # Process each participant (starting from row 3, matching card_sort_parser.py)
        participants_data = []
        
        for row_index in range(3, len(df)):
            groups = process_participant(row_index, df, group_start, group_end, name_start, name_end)
            if groups:  # Only add participants who have at least one group
                participants_data.append({
                    'participant_number': row_index + 1,
                    'groups': groups
                })
        
        print(f"Processed {len(participants_data)} participants")
        
        # Perform analyses
        print("\nAnalyzing group names...")
        group_name_counts = analyze_group_names(participants_data)
        
        print("Analyzing co-occurrence pairs...")
        pair_counts = analyze_cooccurrence_pairs(participants_data)
        
        print("Analyzing element frequency...")
        element_counts = analyze_element_frequency(participants_data)
        
        print("Analyzing element relationships...")
        element_relationships = analyze_element_relationships(participants_data)
        
        # Write results to file
        print(f"\nWriting analysis results to: {OUTPUT_FILE}")
        with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
            f.write("=" * 80 + "\n")
            f.write("CARD SORT GROUPINGS ANALYSIS\n")
            f.write("=" * 80 + "\n\n")
            
            # 1. Most Popular Group Names
            f.write("-" * 80 + "\n")
            f.write("1. MOST POPULAR GROUP NAMES\n")
            f.write("-" * 80 + "\n\n")
            if group_name_counts:
                for group_name, count in group_name_counts.most_common():
                    f.write(f"  {group_name}: {count} occurrence(s)\n")
            else:
                f.write("  (No group names found)\n")
            f.write("\n\n")
            
            # 2. Top Co-occurring Element Pairs
            f.write("-" * 80 + "\n")
            f.write("2. TOP CO-OCCURRING ELEMENT PAIRS\n")
            f.write("-" * 80 + "\n\n")
            if pair_counts:
                top_pairs = pair_counts.most_common(30)  # Top 30 pairs
                for pair, count in top_pairs:
                    f.write(f"  {format_pair(pair)}: {count} occurrence(s)\n")
            else:
                f.write("  (No pairs found)\n")
            f.write("\n\n")
            
            # 3. Element Frequency
            f.write("-" * 80 + "\n")
            f.write("3. ELEMENT FREQUENCY (How often each element appears in groups)\n")
            f.write("-" * 80 + "\n\n")
            if element_counts:
                for element, count in element_counts.most_common():
                    f.write(f"  {element}: {count} occurrence(s)\n")
            else:
                f.write("  (No elements found)\n")
            f.write("\n\n")
            
            # 4. Element-to-Element Relationships
            f.write("-" * 80 + "\n")
            f.write("4. ELEMENT-TO-ELEMENT RELATIONSHIPS\n")
            f.write("(For each element, shows top 5 most commonly co-occurring elements)\n")
            f.write("-" * 80 + "\n\n")
            if element_relationships:
                # Sort elements by their overall frequency for consistent ordering
                sorted_elements = sorted(element_relationships.keys(), 
                                       key=lambda x: element_counts.get(x, 0), 
                                       reverse=True)
                
                for element in sorted_elements:
                    relationships = element_relationships[element]
                    if relationships:
                        f.write(f"  {element}:\n")
                        top_5 = relationships.most_common(5)
                        for related_element, count in top_5:
                            f.write(f"    - {related_element}: {count} time(s) together\n")
                        f.write("\n")
            else:
                f.write("  (No relationships found)\n")
        
        print(f"Successfully generated analysis!")
        print(f"Results written to: {OUTPUT_FILE}")
        
        # Print summary to console
        print("\n" + "=" * 80)
        print("ANALYSIS SUMMARY")
        print("=" * 80)
        print(f"Total participants analyzed: {len(participants_data)}")
        print(f"Unique group names: {len(group_name_counts)}")
        print(f"Unique element pairs: {len(pair_counts)}")
        print(f"Unique elements: {len(element_counts)}")
        if group_name_counts:
            print(f"\nTop 5 group names:")
            for name, count in group_name_counts.most_common(5):
                print(f"  - {name}: {count}")
        if pair_counts:
            print(f"\nTop 5 element pairs:")
            for pair, count in pair_counts.most_common(5):
                print(f"  - {format_pair(pair)}: {count}")
        
    except FileNotFoundError:
        print(f"Error: Excel file not found at {EXCEL_FILE}")
    except Exception as e:
        print(f"Error processing file: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    main()

