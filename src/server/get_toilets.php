<?php
    include 'connect_db.php';

    $stmt = $pdo->prepare('SELECT * FROM toilets');
    $stmt->execute();
    $res = $stmt->fetchAll();

    header('Content-type: application/json');
    echo json_encode($res);
?>