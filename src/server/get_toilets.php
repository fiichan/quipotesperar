<?php
    include 'connect_db.php';

    $stmt = $pdo->query('SELECT * FROM toilets');
    print_r($stmt->fetch());
?>