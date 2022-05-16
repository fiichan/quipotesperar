<?php
    include "connect_db.php";

    $stmt = $pdo->query('SELECT * FROM toilets WHERE id = ?');
    $stmt->execute([$id]);

    $toilet = $stmt->fetch();
    $toilet = sanitize_values($toilet);

    $stmt = $pdo->prepare('UPDATE toilets SET /* set variables here that need to be updated */ WHERE id = ?');
    $stmt->execute([$bonus, $id]);

    function sanitize_values($user_input) {
        throw new Exception("not implemented", 1);
    }

    function update_toilet_values($curr, $new) {
        throw new Exception("not implemented", 1);
    }

    function build_query($values) {
        throw new Exception("not implemented", 1);
    }
?>