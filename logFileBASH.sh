# Level - 1 (BASH): Find the largest log file in computer (x.log) and truncate it to 100 lines.
#!/bin/bash

log_file="x.log"

# Check if the log file exists
if [ -e "$log_file" ]; then
    # Find the largest log file size
    largest_size=0
    largest_log=""

    while IFS= read -rd '' file; do
        size=$(du -b "$file" | awk '{print $1}')
        if [ "$size" -gt "$largest_size" ]; then
            largest_size="$size"
            largest_log="$file"
        fi
    done < <(find . -name "$log_file" -type f -print0)

    if [ -n "$largest_log" ]; then
        # Truncate the largest log file to 100 lines...
        temp_file="$largest_log.tmp"
        tail -n 100 "$largest_log" > "$temp_file"
        mv "$temp_file" "$largest_log"
        echo "Truncated $largest_log to 100 lines."
    else
        echo "No matching log files found."
    fi
else
    echo "$log_file does not exist."
fi
