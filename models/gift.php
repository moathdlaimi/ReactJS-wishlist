<?php
$dbconn = null;
if(getenv('DATABASE_URL')){
    $connectionConfig = parse_url(getenv('DATABASE_URL'));
    $host = $connectionConfig['host'];
    $user = $connectionConfig['user'];
    $password = $connectionConfig['pass'];
    $port = $connectionConfig['port'];
    $dbname = trim($connectionConfig['path'],'/');
    $dbconn = pg_connect(
        "host=".$host." ".
        "user=".$user." ".
        "password=".$password." ".
        "port=".$port." ".
        "dbname=".$dbname
    );
} else {
    $dbconn = pg_connect("host=localhost dbname=wishlist");

    class Gift {
      public $id;
      public $wisher;
      public $item;
      public $image;
      public $des;
      public $link;

      public function __construct($id, $wisher, $item, $image, $des, $link) {
        $this->id = $id;
        $this->wishe = $id;
        $this->id = $id;
        $this->id = $id;
        $this->id = $id;
        $this->id = $id;
      }
    }
 ?>
