**WHAT IS ANIBLOCKER?**
AniBlocker is an open-source ad-blocking extension specifically designed for anime streaming platforms. It works by using filtering rules to hide ads and prevent pop-ups from appearing on supported websites.

**SYSTEM REQUIREMENTS**

- Chromium-based browser (Chrome, Brave, Edge, Opera, Vivaldi, etc.)
- Administrator or user permissions to install extensions
- The extension files from the AniBlocker repository

**INSTALLATION STEPS FOR CHROMIUM-BASED BROWSERS:**

- DOWNLOAD AND EXTRACT FILES
- Download the v1.0.0.zip file from the GitHub release
- Extract the ZIP file to a folder on your computer
- Keep this folder accessible (don't delete it after installation)
- OPEN EXTENSION MANAGEMENT PAGE
- Open your browser
- Type "chrome://extensions/" in the address bar (or "brave://extensions/" for Brave, "edge://extensions/" for Edge)
- Press Enter to open the Extensions page
- ENABLE DEVELOPER MODE
- Look for the toggle switch labeled "Developer mode" in the top-right corner
- Click it to turn Developer mode ON
- The toggle should turn blue
- LOAD THE EXTENSION
- Click the "Load unpacked" button that appears after enabling Developer mode
- Navigate to the folder where you extracted AniBlocker files
- Select the folder and click "Select Folder"
- The extension will now be loaded into your browser

***VERIFY INSTALLATION***
- You should see AniBlocker in your extensions list
- The extension icon may appear in your browser toolbar
- You can pin it to the toolbar for easy access by clicking the pin icon

**CONFIGURE SETTINGS**
- Click the AniBlocker icon in the toolbar
- Review the extension's popup interface
- Enable/disable blocking rules as needed
- Settings are typically saved automatically

**WHAT THE EXTENSION INCLUDES:**

The AniBlocker package contains:

- manifest.json (defines the extension)
- background.js (runs in the background)
- content.js (runs on webpage content)
- popup.js, popup.html, popup.css (extension interface)
- hide.css (styling for blocked elements)
- popup-blocker.js (blocks pop-ups)
- rules.json (filtering rules for ads)
- icons folder (extension icons)

**USING ANIBLOCKER:**

*AFTER INSTALLATION*
- The extension will automatically start blocking ads on compatible websites
- You may need to refresh webpages to see the blocking take effect
**ACCESS EXTENSION OPTIONS**
- Click the AniBlocker icon in your toolbar
- A popup menu will appear with blocking options
- Toggle specific blocking rules on/off as desired
**MANAGE EXCEPTIONS**
- You can typically whitelist specific websites if needed
- This allows ads on certain trusted sites while blocking on others
**TROUBLESHOOTING:**

**If the extension doesn't work:**

- Verify you extracted ALL files from the ZIP
- Ensure you're using a Chromium-based browser
- Try refreshing the webpage with F5 or Ctrl+R
- Disable other ad-blockers that might conflict
- Check that Developer mode is still enabled
- Reinstall the extension by removing and reloading it
**If ads still appear:**

- The website may have updated its ad structure
- Check the rules.json file and update blocking rules if needed
- Contact the extension creator on GitHub for rule updates
**IMPORTANT NOTES:**

- KEEP THE FOLDER
- Don't move or delete the extracted AniBlocker folder after installation
- The browser needs to access these files constantly
- If moved, the extension will break and need reinstalling
**UPDATES**
- To update to a newer version, download the new release
- Extract to a new folder
- Remove the old extension from chrome://extensions
- Load the new unpacked extension
**BROWSER COMPATIBILITY**
- Chrome, Chromium, Brave, Microsoft Edge, Opera, Vivaldi all support this
- Firefox requires conversion to XPI format (next update)
- Safari is not compatible
**PERMISSIONS**
- The extension requests permission to modify website content
- This is necessary for ad blocking to function
- It only affects compatible websites
**UNINSTALLING:**

If you want to remove AniBlocker:

Go to chrome://extensions/ (or equivalent)
Find AniBlocker in the list
Click the "Remove" button
Confirm the removal
You can safely delete the extracted folder
