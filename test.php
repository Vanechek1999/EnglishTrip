<?php

if (!empty($_POST['textcontent'])) {
    file_put_contents("yourWords.txt", $_POST['textcontent'], FILE_APPEND);
    exit("<p>TXT file written successfully!</p>");
}
// This is where you write to the text file.
// The string in the exit() function will appear in your $("#ajax-area")
else {
    exit("<p>No text string submitted.</p>");
}

?>