# Accordion Block Plugin for Gutenberg

This plugin adds a custom accordion block to the Gutenberg editor in WordPress. It allows users to create collapsible accordion items with titles and content. The block is fully customizable and includes accessibility features with ARIA attributes.

## Installation

### Step 1: Download or Clone the Plugin

1. Download or clone the plugin to your local machine.
    - You can clone it with Git:
      ```bash
      git clone https://github.com/your-username/accordion-block.git
      ```

2. Copy the `accordion-block` folder into the `wp-content/plugins/` directory of your WordPress installation.

### Step 2: Activate the Plugin

1. Go to the WordPress Admin Panel.
2. Navigate to **Plugins** > **Installed Plugins**.
3. Find the **Accordion Block** plugin and click **Activate**.

## Usage

### Step 1: Add the Accordion Block

1. Go to the WordPress editor (Gutenberg).
2. Click the **Add Block** button (+).
3. Search for "Accordion" in the block search bar.
4. Click on the **Accordion** block to add it to your page or post.

### Step 2: Configure Accordion Items

1. To add a new item, click the **Add Accordion Item** button.
2. Enter a **Title** and **Content** for each accordion item.
3. Use the editor to toggle each item open or closed by clicking on the item's title.

### Step 3: Preview and Publish

1. Once you have added all the accordion items, preview your page or post to ensure everything looks as expected.
2. Click **Publish** or **Update** to save your changes.

## Front-End Rendering

- The accordion will be displayed on the front-end with interactive expand/collapse functionality.
- ARIA attributes are added for accessibility, ensuring that screen readers and other assistive technologies can interact with the accordion properly.

## Uninstallation

To uninstall the plugin:

1. Go to **Plugins** > **Installed Plugins** in the WordPress Admin Panel.
2. Find the **Accordion Block** plugin and click **Deactivate**.
3. After deactivation, click **Delete** to remove the plugin from your WordPress installation.
