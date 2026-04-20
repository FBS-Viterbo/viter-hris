<?php
class Users
{
    public $users_aid;
    public $users_is_active;
    public $users_first_name;
    public $users_last_name;
    public $users_email;
    public $users_password;
    public $users_role_id;
    public $users_created;
    public $users_updated;

    public $connection;
    public $lastInsertedId;

    public $tblSettingsRoles;
    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblSettingsRoles = "settings_users";
        $this->tblSettingsRoles = "settings_roles";
    }

    public function create()
    {
        try {
            $sql = "insert into {$this->tblSettingsRoles} ";
            $sql .= "(";
            $sql .= " users_is_active, ";
            $sql .= " users_first_name, ";
            $sql .= " users_last_name, ";
            $sql .= " users_email, ";
            $sql .= " users_password, ";
            $sql .= " users_role_id, ";
            $sql .= " users_created, ";
            $sql .= " users_updated ";
            $sql .= ") values ( ";
            $sql .= " :users_is_active, ";
            $sql .= " users_first_name, ";
            $sql .= " users_last_name, ";
            $sql .= " users_email, ";
            $sql .= " users_password, ";
            $sql .= " users_role_id, ";
            $sql .= " users_created, ";
            $sql .= " users_updated ";
            $sql .= " )";

            $query = $this->connection->prepare($sql);
            $query->execute([
                "users_is_active" => $this->users_is_active,
                "users_first_name" => $this->users_first_name,
                "users_description" => $this->users_description,
                "users_created" => $this->users_created,
                "users_updated" => $this->users_updated,
            ]);
            $this->lastInsertedId = $this->connection->lastInsertId();

        } catch (PDOException $e) {
            $query = false;
        }
        return $query;
    }

    public function readAll()
    {
        try {
            $sql = " select ";
            $sql .= " * ";
            $sql .= " from {$this->tblSettingsRoles}";
            $query = $this->connection->query($sql);

        } catch (PDOException $e) {
            $query = false;
        }
        return $query;
    }

    public function update()
    {
        try {
            $sql = "update {$this->tblSettingsRoles} set ";
            $sql .= "users_first_name = :users_first_name, ";
            $sql .= "users_description = :users_description, ";
            $sql .= "users_updated = :users_updated ";
            $sql .= "where users_aid = :users_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "users_first_name" => $this->users_first_name,
                "users_description" => $this->users_description,
                "users_updated" => $this->users_updated,
                "users_aid" => $this->users_aid
            ]);
        } catch (PDOException $e) {
            returnError($e);
            $query = false;
        }
        return $query;
    }

    public function active()
    {
        try {
            $sql = "update {$this->tblSettingsRoles} set ";
            $sql .= "users_is_active = :users_is_active, ";
            $sql .= "users_updated = :users_updated ";
            $sql .= "where users_aid = :users_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "users_is_active" => $this->users_is_active,
                "users_updated" => $this->users_updated,
                "users_aid" => $this->users_aid
            ]);
        } catch (PDOException $e) {
            returnError($e);//use for debugging // use it if error is invalid request error
            $query = false;
        }
        return $query;
    }

    public function delete()
    {
        try {
            $sql = "delete from {$this->tblSettingsRoles} ";
            $sql .= "where users_aid = :users_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "users_aid" => $this->users_aid
            ]);
        } catch (PDOException $e) {
            returnError($e);//use for debugging // use it if error is invalid request error
            $query = false;
        }
        return $query;
    }

    public function checkName()
    {
        try {
            $sql = " select ";
            $sql .= " users_first_name ";
            $sql .= " from {$this->tblSettingsRoles}";
            $sql .= " where users_first_name = :users_first_name ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "users_first_name" => $this->users_first_name,
            ]);


        } catch (PDOException $e) {
            $query = false;
        }
        return $query;
    }

}