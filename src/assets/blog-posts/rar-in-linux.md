---
title: RAR in linux
date: 2024-11-10
image: https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg
excerpt: How to run RAR in linux
---


To install `rarlinux-x64-701.tar.gz` on Ubuntu, which is the RAR compression tool for Linux, follow these steps:

1. **Download the File**  
   If you haven't already downloaded `rarlinux-x64-701.tar.gz`, you can get it from the [official WinRAR website](https://www.rarlab.com/download.htm).

2. **Open Terminal**  
   Open the terminal on your Ubuntu system by pressing `Ctrl + Alt + T`.

3. **Navigate to the Download Directory**  
   If the `.tar.gz` file is in your `Downloads` folder, navigate to that directory:
   ```bash
   cd ~/Downloads
   ```

4. **Extract the TAR File**  
   Use the following command to extract `rarlinux-x64-701.tar.gz`:
   ```bash
   tar -zxvf rarlinux-x64-701.tar.gz
   ```

   This will create a new directory named `rar`.

5. **Navigate to the RAR Directory**  
   Change into the extracted directory:
   ```bash
   cd rar
   ```

6. **Install RAR**  
   Run the following command to install RAR:
   ```bash
   sudo cp rar unrar /usr/local/bin/
   ```

   This command copies the `rar` and `unrar` binaries to `/usr/local/bin`, making them accessible from anywhere in your terminal.

7. **Verify the Installation**  
   Check if `rar` and `unrar` are installed correctly by running:
   ```bash
   rar
   ```
   or
   ```bash
   unrar
   ```

   This should display usage information, confirming the tools are installed successfully.

---

Now, you can use `rar` to compress files and `unrar` to extract `.rar` files in Ubuntu!

---
To extract multiple `.rar` files at once on Ubuntu, you can use the `unrar` command in a loop or a wildcard pattern. Here’s how to do it:

### 1. **Using a Wildcard with `unrar`**

Alternatively, if your `unrar` version supports wildcards, you can try this:

```bash
unrar x "*.rar"
```

However, this approach may not work in all `unrar` versions or may require quotes around `*.rar`.


### 2. **Extract All `.rar` Files to a Specific Directory**

If you want to extract all `.rar` files into a specific directory, create the destination folder (if it doesn’t exist) and specify the path:

```bash
mkdir -p ~/extracted_files
for file in *.rar; do unrar x "$file" ~/extracted_files; done
```

- Replace `~/extracted_files` with the path to your desired extraction directory.
- This command will extract all `.rar` files into the `~/extracted_files` directory.

### 3. **Extract All `.rar` Files in the Current Directory**

If you want to extract all `.rar` files in the current directory into separate folders, use the following command:

```bash
for file in *.rar; do unrar x "$file"; done
```

- This command iterates over each `.rar` file in the directory and extracts it into a folder with the same name as the `.rar` file.
- The `x` option ensures that files are extracted with full path, which is useful if the `.rar` files contain subdirectories.


### 4. **Recursively Extract `.rar` Files in Subdirectories**

If you have `.rar` files in various subdirectories and want to extract them all, use `find`:

```bash
find . -name "*.rar" -exec unrar x {} \;
```

This command searches for all `.rar` files starting from the current directory (`.`) and extracts each one.

---

These commands allow you to quickly and efficiently extract multiple `.rar` files at once!
---

To create a `.rar` archive from multiple files at once on Ubuntu, you can use the `rar` command with a few options to specify the files you want to include. Here’s how:

### 1. **Basic Command to Create a `.rar` Archive from Multiple Files**

Use the following syntax to compress multiple files into a single `.rar` archive:

```bash
rar a archive_name.rar file1 file2 file3
```

- Replace `archive_name.rar` with your desired archive name.
- Replace `file1 file2 file3` with the names of the files you want to include.

For example, if you want to create an archive named `documents.rar` with files `file1.txt`, `file2.txt`, and `file3.txt`:

```bash
rar a documents.rar file1.txt file2.txt file3.txt
```

### 2. **Add All Files in a Directory to a `.rar` Archive**

If you want to add all files in a specific directory, you can use a wildcard (`*`) to select all files:

```bash
rar a archive_name.rar /path/to/directory/*
```

For example, to create an archive named `backup.rar` from all files in the `Documents` folder:

```bash
rar a backup.rar ~/Documents/*
```

### 3. **Include All Files and Subdirectories**

To compress a directory with all its contents (including subdirectories), use this command:

```bash
rar a -r archive_name.rar /path/to/directory
```

- The `-r` option means **recursive**, which includes all subdirectories.
- Replace `/path/to/directory` with the directory you want to compress.

For example:

```bash
rar a -r my_project.rar ~/my_project
```

### 4. **Exclude Specific Files or Types from the Archive**

To exclude certain file types or specific files, use the `-x` option:

```bash
rar a archive_name.rar /path/to/directory -x*.log -x*.tmp
```

This command will exclude all `.log` and `.tmp` files from the archive.

---

These commands make it easy to create a `.rar` archive from multiple files or an entire directory structure!