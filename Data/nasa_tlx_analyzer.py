import pandas as pd
import numpy as np
from scipy import stats
from statistics import mode, StatisticsError
import os
import matplotlib.pyplot as plt
from matplotlib.patches import Rectangle
import matplotlib.patches as mpatches

def calculate_mode(data):
    """Calculate mode, handling cases where mode doesn't exist or multiple modes exist."""
    try:
        # Remove NaN values
        clean_data = [x for x in data if pd.notna(x)]
        if len(clean_data) == 0:
            return None
        return mode(clean_data)
    except StatisticsError:
        # If multiple modes exist, return the first one
        try:
            return stats.mode(clean_data, keepdims=True)[0][0]
        except:
            return None

def create_table_image(df):
    """Create an image of the summary table with highlighted mean and SD columns."""
    # Set up the figure
    fig, ax = plt.subplots(figsize=(16, 10))
    ax.axis('tight')
    ax.axis('off')
    
    # Prepare data for table (convert DataFrame to list of lists)
    table_data_list = [df.columns.tolist()] + df.values.tolist()
    
    # Create table
    table = ax.table(cellText=table_data_list,
                     cellLoc='center',
                     loc='center',
                     colWidths=[0.12] + [0.088] * (len(df.columns) - 1))
    
    # Style the table
    table.auto_set_font_size(False)
    table.set_fontsize(9)
    table.scale(1, 2.5)
    
    # Identify columns to highlight (Mean and SD columns)
    highlight_cols = []
    for i, col in enumerate(df.columns):
        if 'Mean' in col or 'SD' in col:
            highlight_cols.append(i)
    
    # Apply highlighting to mean and SD columns
    highlight_color = '#FFE5B4'  # Light orange/peach color
    
    for col_idx in highlight_cols:
        for row_idx in range(len(table_data_list)):
            cell = table[(row_idx, col_idx)]
            cell.set_facecolor(highlight_color)
            cell.set_edgecolor('black')
            cell.set_linewidth(1)
    
    # Style header row
    for col_idx in range(len(df.columns)):
        cell = table[(0, col_idx)]
        cell.set_facecolor('#4A90E2')  # Blue header
        cell.set_text_props(weight='bold', color='white')
        cell.set_edgecolor('black')
        cell.set_linewidth(1.5)
    
    # Style data rows (alternating colors for better readability)
    for row_idx in range(1, len(table_data_list)):
        for col_idx in range(len(df.columns)):
            cell = table[(row_idx, col_idx)]
            if row_idx % 2 == 0:
                if col_idx not in highlight_cols:
                    cell.set_facecolor('#F5F5F5')  # Light gray for even rows
            else:
                if col_idx not in highlight_cols:
                    cell.set_facecolor('white')
            cell.set_edgecolor('black')
            cell.set_linewidth(0.5)
    
    # Add title
    plt.title('NASA TLX Results Summary Table\n(Mean and SD columns highlighted)', 
              fontsize=14, fontweight='bold', pad=20)
    
    # Save the figure
    output_image = 'nasaTLXResults_table.png'
    plt.savefig(output_image, dpi=300, bbox_inches='tight', facecolor='white')
    print(f"Table image saved to {output_image}")
    plt.close()

def create_box_plots(results, question_labels, df, esther_cols, rusp_cols):
    """Create box plots comparing Esther and RUSP for each question."""
    # Set up the figure with subplots (2 rows, 3 columns for 6 questions)
    fig, axes = plt.subplots(2, 3, figsize=(18, 12))
    fig.suptitle('NASA TLX Results: Box Plot Comparison (Esther vs RUSP)', 
                 fontsize=16, fontweight='bold', y=0.995)
    
    # Flatten axes array for easier indexing
    axes = axes.flatten()
    
    # Colors for the box plots
    esther_color = '#4A90E2'  # Blue
    rusp_color = '#E24A4A'    # Red
    
    # Create box plot for each question
    for i, question in enumerate(question_labels):
        ax = axes[i]
        
        # Get data for this question
        esther_col = esther_cols[i]
        rusp_col = rusp_cols[i]
        
        # Extract data, converting to numeric and removing NaN
        esther_data = pd.to_numeric(df[esther_col], errors='coerce').dropna().tolist()
        rusp_data = pd.to_numeric(df[rusp_col], errors='coerce').dropna().tolist()
        
        # Prepare data for box plot
        plot_data = [esther_data, rusp_data]
        positions = [1, 2]
        labels = ['Esther', 'RUSP']
        
        # Create box plot
        bp = ax.boxplot(plot_data, positions=positions, labels=labels, 
                       patch_artist=True, widths=0.6,
                       showmeans=True, meanline=True)
        
        # Color the boxes
        for patch, color in zip(bp['boxes'], [esther_color, rusp_color]):
            patch.set_facecolor(color)
            patch.set_alpha(0.7)
            patch.set_edgecolor('black')
            patch.set_linewidth(1.5)
        
        # Style the median lines
        for median in bp['medians']:
            median.set_color('black')
            median.set_linewidth(2)
        
        # Style the mean lines
        for mean in bp['means']:
            mean.set_color('darkgreen')
            mean.set_linewidth(2)
            mean.set_linestyle('--')
        
        # Style whiskers, caps, and fliers
        for element in ['whiskers', 'caps']:
            for item in bp[element]:
                item.set_color('black')
                item.set_linewidth(1.5)
        
        for flier in bp['fliers']:
            flier.set_marker('o')
            flier.set_markerfacecolor('gray')
            flier.set_markersize(5)
            flier.set_alpha(0.6)
        
        # Set title and labels
        ax.set_title(question, fontsize=12, fontweight='bold', pad=10)
        ax.set_ylabel('Score', fontsize=10)
        ax.set_ylim(-5, 105)  # Slight padding beyond 0-100 range
        ax.grid(True, alpha=0.3, axis='y', linestyle='--')
        ax.set_axisbelow(True)
        
        # Add mean values as text annotations
        esther_mean = np.mean(esther_data) if len(esther_data) > 0 else 0
        rusp_mean = np.mean(rusp_data) if len(rusp_data) > 0 else 0
        ax.text(1, ax.get_ylim()[1] - 5, f'μ={esther_mean:.1f}', 
                ha='center', va='top', fontsize=9, fontweight='bold',
                bbox=dict(boxstyle='round', facecolor='white', alpha=0.8))
        ax.text(2, ax.get_ylim()[1] - 5, f'μ={rusp_mean:.1f}', 
                ha='center', va='top', fontsize=9, fontweight='bold',
                bbox=dict(boxstyle='round', facecolor='white', alpha=0.8))
    
    # Adjust layout to prevent overlap
    plt.tight_layout(rect=[0, 0, 1, 0.97])
    
    # Add legend
    from matplotlib.patches import Patch
    legend_elements = [
        Patch(facecolor=esther_color, alpha=0.7, edgecolor='black', label='Esther'),
        Patch(facecolor=rusp_color, alpha=0.7, edgecolor='black', label='RUSP'),
        plt.Line2D([0], [0], color='darkgreen', linestyle='--', linewidth=2, label='Mean'),
        plt.Line2D([0], [0], color='black', linewidth=2, label='Median')
    ]
    fig.legend(handles=legend_elements, loc='upper right', bbox_to_anchor=(0.98, 0.98), 
               fontsize=10, framealpha=0.9)
    
    # Save the figure
    output_image = 'nasaTLXResults_boxplots.png'
    plt.savefig(output_image, dpi=300, bbox_inches='tight', facecolor='white')
    print(f"Box plot image saved to {output_image}")
    plt.close()

def analyze_nasa_tlx():
    """Analyze NASA TLX results comparing Esther and RUSP conditions."""
    
    # Read the CSV file
    csv_path = 'nasatlxresults.csv'
    if not os.path.exists(csv_path):
        print(f"Error: {csv_path} not found in current directory")
        return
    
    # Read CSV, skipping the second row which contains long question text
    df = pd.read_csv(csv_path, skiprows=[1])
    
    # Define column names for Esther (Q2_1 to Q2_6) and RUSP (Q11_1 to Q11_6)
    esther_cols = ['Q2_1', 'Q2_2', 'Q2_3', 'Q2_4', 'Q2_5', 'Q2_6']
    rusp_cols = ['Q11_1', 'Q11_2', 'Q11_3', 'Q11_4', 'Q11_5', 'Q11_6']
    
    # Question labels (assuming standard NASA TLX questions)
    question_labels = [
        'Mental Demand',
        'Physical Demand',
        'Temporal Demand',
        'Performance',
        'Effort',
        'Frustration'
    ]
    
    # Verify columns exist
    missing_esther = [col for col in esther_cols if col not in df.columns]
    missing_rusp = [col for col in rusp_cols if col not in df.columns]
    
    if missing_esther:
        print(f"Warning: Missing Esther columns: {missing_esther}")
    if missing_rusp:
        print(f"Warning: Missing RUSP columns: {missing_rusp}")
    
    # Prepare data structures for results
    results = {}
    table_data = []
    
    # Analyze each question
    for i, question in enumerate(question_labels):
        esther_col = esther_cols[i]
        rusp_col = rusp_cols[i]
        
        # Extract data, converting to numeric and removing NaN
        esther_data = pd.to_numeric(df[esther_col], errors='coerce').dropna()
        rusp_data = pd.to_numeric(df[rusp_col], errors='coerce').dropna()
        
        # Calculate statistics for Esther
        esther_stats = {
            'mean': np.mean(esther_data),
            'sd': np.std(esther_data, ddof=1),  # Sample standard deviation
            'min': np.min(esther_data),
            'max': np.max(esther_data),
            'mode': calculate_mode(esther_data),
            'median': np.median(esther_data)
        }
        
        # Calculate statistics for RUSP
        rusp_stats = {
            'mean': np.mean(rusp_data),
            'sd': np.std(rusp_data, ddof=1),  # Sample standard deviation
            'min': np.min(rusp_data),
            'max': np.max(rusp_data),
            'mode': calculate_mode(rusp_data),
            'median': np.median(rusp_data)
        }
        
        # Store results
        results[question] = {
            'Esther': esther_stats,
            'RUSP': rusp_stats
        }
        
        # Perform statistical test (t-test for independent samples)
        try:
            t_stat, p_value = stats.ttest_ind(esther_data, rusp_data)
            
            # Also perform Mann-Whitney U test (non-parametric alternative)
            u_stat, u_p_value = stats.mannwhitneyu(esther_data, rusp_data, alternative='two-sided')
            
            results[question]['statistical_test'] = {
                't_test': {
                    't_statistic': t_stat,
                    'p_value': p_value,
                    'significant': p_value < 0.05
                },
                'mannwhitney': {
                    'u_statistic': u_stat,
                    'p_value': u_p_value,
                    'significant': u_p_value < 0.05
                }
            }
        except Exception as e:
            print(f"Warning: Could not perform statistical test for {question}: {e}")
            results[question]['statistical_test'] = None
        
        # Prepare table row
        table_data.append({
            'Question': question,
            'Esther Mean': f"{esther_stats['mean']:.2f}",
            'Esther SD': f"{esther_stats['sd']:.2f}",
            'Esther Min': f"{esther_stats['min']:.2f}",
            'Esther Max': f"{esther_stats['max']:.2f}",
            'Esther Mode': f"{esther_stats['mode']:.2f}" if esther_stats['mode'] is not None else 'N/A',
            'Esther Median': f"{esther_stats['median']:.2f}",
            'RUSP Mean': f"{rusp_stats['mean']:.2f}",
            'RUSP SD': f"{rusp_stats['sd']:.2f}",
            'RUSP Min': f"{rusp_stats['min']:.2f}",
            'RUSP Max': f"{rusp_stats['max']:.2f}",
            'RUSP Mode': f"{rusp_stats['mode']:.2f}" if rusp_stats['mode'] is not None else 'N/A',
            'RUSP Median': f"{rusp_stats['median']:.2f}"
        })
    
    # Write results to text file
    output_file = 'nasaTLXResults.txt'
    with open(output_file, 'w') as f:
        f.write("NASA TLX Results Analysis\n")
        f.write("=" * 80 + "\n\n")
        
        # Write detailed results for each question
        for question in question_labels:
            f.write(f"\n{question}:\n")
            f.write("-" * 80 + "\n")
            
            f.write("Esther Results:\n")
            esther = results[question]['Esther']
            f.write(f"    - Mean: {esther['mean']:.2f}\n")
            f.write(f"    - SD: {esther['sd']:.2f}\n")
            f.write(f"    - Min: {esther['min']:.2f}\n")
            f.write(f"    - Max: {esther['max']:.2f}\n")
            f.write(f"    - Mode: {esther['mode']:.2f}\n" if esther['mode'] is not None else "    - Mode: N/A\n")
            f.write(f"    - Median: {esther['median']:.2f}\n")
            
            f.write("\nRUSP Results:\n")
            rusp = results[question]['RUSP']
            f.write(f"    - Mean: {rusp['mean']:.2f}\n")
            f.write(f"    - SD: {rusp['sd']:.2f}\n")
            f.write(f"    - Min: {rusp['min']:.2f}\n")
            f.write(f"    - Max: {rusp['max']:.2f}\n")
            f.write(f"    - Mode: {rusp['mode']:.2f}\n" if rusp['mode'] is not None else "    - Mode: N/A\n")
            f.write(f"    - Median: {rusp['median']:.2f}\n")
            
            # Write statistical test results
            if results[question]['statistical_test']:
                f.write("\nStatistical Tests:\n")
                t_test = results[question]['statistical_test']['t_test']
                mw_test = results[question]['statistical_test']['mannwhitney']
                
                f.write(f"    Independent Samples t-test:\n")
                f.write(f"        t-statistic: {t_test['t_statistic']:.4f}\n")
                f.write(f"        p-value: {t_test['p_value']:.4f}\n")
                f.write(f"        Significant (p < 0.05): {'Yes' if t_test['significant'] else 'No'}\n")
                
                f.write(f"    Mann-Whitney U test:\n")
                f.write(f"        U-statistic: {mw_test['u_statistic']:.4f}\n")
                f.write(f"        p-value: {mw_test['p_value']:.4f}\n")
                f.write(f"        Significant (p < 0.05): {'Yes' if mw_test['significant'] else 'No'}\n")
            else:
                f.write("\nStatistical Tests: Could not be performed\n")
        
        # Write summary table
        f.write("\n\n" + "=" * 80 + "\n")
        f.write("SUMMARY TABLE\n")
        f.write("=" * 80 + "\n\n")
        
        # Create table
        table_df = pd.DataFrame(table_data)
        f.write(table_df.to_string(index=False))
        f.write("\n\n")
        
        # Write statistical test summary
        f.write("=" * 80 + "\n")
        f.write("STATISTICAL TEST SUMMARY\n")
        f.write("=" * 80 + "\n\n")
        
        for question in question_labels:
            if results[question]['statistical_test']:
                t_test = results[question]['statistical_test']['t_test']
                mw_test = results[question]['statistical_test']['mannwhitney']
                
                f.write(f"{question}:\n")
                f.write(f"  t-test: t = {t_test['t_statistic']:.4f}, p = {t_test['p_value']:.4f} {'*' if t_test['significant'] else ''}\n")
                f.write(f"  Mann-Whitney U: U = {mw_test['u_statistic']:.4f}, p = {mw_test['p_value']:.4f} {'*' if mw_test['significant'] else ''}\n")
                f.write(f"  (* indicates p < 0.05)\n\n")
    
    print(f"Analysis complete! Results written to {output_file}")
    
    # Also print the table to console
    print("\nSummary Table:")
    print("=" * 120)
    table_df = pd.DataFrame(table_data)
    print(table_df.to_string(index=False))
    print("\n")
    
    # Create table image
    print("Creating table image...")
    try:
        create_table_image(table_df)
        print("Table image created successfully!")
    except Exception as e:
        print(f"Error creating table image: {e}")
        import traceback
        traceback.print_exc()
    
    # Create box plots
    print("Creating box plots...")
    try:
        create_box_plots(results, question_labels, df, esther_cols, rusp_cols)
        print("Box plot image created successfully!")
    except Exception as e:
        print(f"Error creating box plots: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    # Change to the Data directory
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    analyze_nasa_tlx()

