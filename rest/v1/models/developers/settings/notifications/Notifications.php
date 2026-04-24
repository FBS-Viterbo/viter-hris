<?php

class Notifications
{
    public $notification_aid;
    public $notification_is_active;
    public $first_name;
    public $last_name;
    public $purpose;
    public $email;
    public $email_old;
    public $notification_created;
    public $notification_updated;

    public $connection;
    public $start;
    public $total;
    public $search;
    public $lastInsertedId;

    public $tblSettingsNotification;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblSettingsNotification = "settings_notification";
    }

    public function create()
    {
        try {
            $sql = "insert into {$this->tblSettingsNotification} ";
            $sql .= "( ";
            $sql .= " notification_is_active, ";
            $sql .= " first_name, ";
            $sql .= " last_name, ";
            $sql .= " purpose, ";
            $sql .= " email, ";
            $sql .= " notification_created, ";
            $sql .= " notification_updated ";
            $sql .= ") values ( ";
            $sql .= " :notification_is_active, ";
            $sql .= " :first_name, ";
            $sql .= " :last_name, ";
            $sql .= " :purpose, ";
            $sql .= " :email, ";
            $sql .= " :notification_created, ";
            $sql .= " :notification_updated ";
            $sql .= " ) ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "notification_is_active" => $this->notification_is_active,
                "first_name" => $this->first_name,
                "last_name" => $this->last_name,
                "purpose" => $this->purpose,
                "email" => $this->email,
                "notification_created" => $this->notification_created,
                "notification_updated" => $this->notification_updated,
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
            $sql = "select * ";
            $sql .= "from {$this->tblSettingsNotification} ";
            $sql .= "where true ";
            $sql .= $this->notification_is_active !== null && $this->notification_is_active !== "" ? " and notification_is_active = :notification_is_active " : " ";
            $sql .= $this->search != "" ? " and (first_name like :first_name or last_name like :last_name or purpose like :purpose or email like :email) " : " ";
            $sql .= " order by first_name asc, last_name asc ";
            $query = $this->connection->prepare($sql);

            if ($this->notification_is_active !== null && $this->notification_is_active !== "") {
                $query->bindValue(":notification_is_active", $this->notification_is_active);
            }

            if ($this->search != "") {
                $search = "%{$this->search}%";
                $query->bindValue(":first_name", $search);
                $query->bindValue(":last_name", $search);
                $query->bindValue(":purpose", $search);
                $query->bindValue(":email", $search);
            }

            $query->execute();
        } catch (PDOException $e) {
            $query = false;
        }
        return $query;
    }

    public function readLimit()
    {
        try {
            $sql = "select * ";
            $sql .= "from {$this->tblSettingsNotification} ";
            $sql .= "where true ";
            $sql .= $this->notification_is_active !== null && $this->notification_is_active !== "" ? " and notification_is_active = :notification_is_active " : " ";
            $sql .= $this->search != "" ? " and (first_name like :first_name or last_name like :last_name or purpose like :purpose or email like :email) " : " ";
            $sql .= " order by first_name asc, last_name asc ";
            $sql .= " limit :start, :total ";
            $query = $this->connection->prepare($sql);
            $query->bindValue(":start", (int) $this->start - 1, PDO::PARAM_INT);
            $query->bindValue(":total", (int) $this->total, PDO::PARAM_INT);

            if ($this->notification_is_active !== null && $this->notification_is_active !== "") {
                $query->bindValue(":notification_is_active", $this->notification_is_active);
            }

            if ($this->search != "") {
                $search = "%{$this->search}%";
                $query->bindValue(":first_name", $search);
                $query->bindValue(":last_name", $search);
                $query->bindValue(":purpose", $search);
                $query->bindValue(":email", $search);
            }

            $query->execute();
        } catch (PDOException $e) {
            $query = false;
        }
        return $query;
    }

    public function active()
    {
        try {
            $sql = "update {$this->tblSettingsNotification} set ";
            $sql .= "notification_is_active = :notification_is_active, ";
            $sql .= "notification_updated = :notification_updated ";
            $sql .= "where email = :email ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "notification_is_active" => $this->notification_is_active,
                "notification_updated" => $this->notification_updated,
                "email" => $this->email,
            ]);
        } catch (PDOException $e) {
            $query = false;
        }
        return $query;
    }

    public function update()
    {
        try {
            $sql = "update {$this->tblSettingsNotification} set ";
            $sql .= "first_name = :first_name, ";
            $sql .= "last_name = :last_name, ";
            $sql .= "purpose = :purpose, ";
            $sql .= "email = :email, ";
            $sql .= "notification_updated = :notification_updated ";
            $sql .= "where email = :email_old ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "first_name" => $this->first_name,
                "last_name" => $this->last_name,
                "purpose" => $this->purpose,
                "email" => $this->email,
                "email_old" => $this->email_old,
                "notification_updated" => $this->notification_updated,
            ]);
        } catch (PDOException $e) {
            $query = false;
        }
        return $query;
    }

    public function delete()
    {
        try {
            $sql = "delete from {$this->tblSettingsNotification} ";
            $sql .= "where email = :email ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "email" => $this->email,
            ]);
        } catch (PDOException $e) {
            $query = false;
        }
        return $query;
    }

    public function checkEmail()
    {
        try {
            $sql = "select email ";
            $sql .= "from {$this->tblSettingsNotification} ";
            $sql .= "where email = :email ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "email" => $this->email,
            ]);
        } catch (PDOException $e) {
            $query = false;
        }
        return $query;
    }
}
