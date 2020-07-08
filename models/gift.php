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
        $this->wisher = $wisher;
        $this->item = $item;
        $this->image = $image;
        $this->des = $des;
        $this->link = $link;
      }
    }

    class Gifts {
      static function all(){
        $gifts = array();

        $results = pg_query("SELECT * FROM gifts");

        $row_object = pg_fetch_object($results);
        while($row_object){
          $new_gift = new Gift(
            intval($row_object->id);
            $row_object->wisher,
            $row_object->item,
            $row_object->image,
            $row_object->des,
            $row_object->link
          );
          $gifts[] = $new_gift;
          $row_object = pg_fetch_object($results);
        }
        return $gifts;
      }
      static function create($gift){
        $query = "INSERT INTO gifts (wisher, item, image, des, link) VALUES ($1, $2, $3, $4, $5)";
        $query_params = array($gift->wisher, $gift->item, $gift->image, $gift->des, $gift->link);
        pg_query_params($query, $query_params);
        return self::all()
      }

    }
 ?>
