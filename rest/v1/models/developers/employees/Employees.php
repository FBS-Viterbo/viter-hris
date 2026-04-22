<?php

class Employees
{
    public $employee_aid;
    public $employee_is_active;
    public $employee_first_name;
    public $employee_middle_name;
    public $employee_last_name;
    public $employee_email;
    public $employee_department_id;
    public $employee_created;
    public $employee_updated;

    public $start;
    public $total;
    public $search;

    public $connection;
    public $lastInsertedId;

    public $tblEmployees;
    public $tblSettingsDepartment;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblEmployees = "employees";
        $this->tblSettingsDepartment = "settings_department";
    }

    // CREATE
    public function create()
    {
        try {
            $sql = "insert into {$this->tblEmployees} ";
            $sql .= " ( ";
            $sql .= " employee_is_active, ";
            $sql .= " employee_first_name, ";
            $sql .= " employee_middle_name, ";
            $sql .= " employee_last_name, ";
            $sql .= " employee_email, ";
            $sql .= " employee_department_id, ";
            $sql .= " employee_created, ";
            $sql .= " employee_updated ";
            $sql .= " ) values (";
            $sql .= " :employee_is_active, ";
            $sql .= " :employee_first_name, ";
            $sql .= " :employee_middle_name, ";
            $sql .= " :employee_last_name, ";
            $sql .= " :employee_email, ";
            $sql .= " :employee_department_id, ";
            $sql .= " :employee_created, ";
            $sql .= " :employee_updated ";
            $sql .= " ) ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "employee_is_active" => $this->employee_is_active,
                "employee_first_name" => $this->employee_first_name,
                "employee_middle_name" => $this->employee_middle_name,
                "employee_last_name" => $this->employee_last_name,
                "employee_email" => $this->employee_email,
                "employee_department_id" => $this->employee_department_id,
                "employee_created" => $this->employee_created,
                "employee_updated" => $this->employee_updated,
            ]);
            $this->lastInsertedId = $this->connection->lastInsertId();
        } catch (PDOException $e) {
            $query = false;
        }
        return $query;
    }

    // READ
    public function readAll()
    {
        try {
            $sql = "select ";
            $sql .= "employee_aid, ";
            $sql .= "employee_is_active, ";
            $sql .= "employee_first_name, ";
            $sql .= "employee_middle_name, ";
            $sql .= "employee_last_name, ";
            $sql .= "employee_email, ";
            $sql .= "employee_department_id, ";
            $sql .= "department.department_name, ";
            $sql .= "employee_created, ";
            $sql .= "employee_updated ";
            $sql .= " from {$this->tblEmployees} ";
            $sql .= " left join {$this->tblSettingsDepartment} as department ";
            $sql .= " on department.department_aid = employee_department_id ";
            $sql .= " where true ";
            $sql .= $this->employee_is_active !== null && $this->employee_is_active !== "" ? " and employee_is_active = :employee_is_active " : " ";
            $sql .= $this->search != "" ? " and ( " : " ";
            $sql .= $this->search != "" ? "employee_first_name like :employee_first_name " : " ";
            $sql .= $this->search != "" ? "or employee_middle_name like :employee_middle_name " : " ";
            $sql .= $this->search != "" ? "or employee_last_name like :employee_last_name " : " ";
            $sql .= $this->search != "" ? "or employee_email like :employee_email " : " ";
            $sql .= $this->search != "" ? "or department.department_name like :department_name " : " ";
            $sql .= $this->search != "" ? " )" : " ";
            $sql .= " order by employee_aid desc ";
            $query = $this->connection->prepare($sql);

            if ($this->employee_is_active !== null && $this->employee_is_active !== "") {
                $query->bindValue(":employee_is_active", $this->employee_is_active);
            }

            if ($this->search != "") {
                $search = "%{$this->search}%";
                $query->bindValue(":employee_first_name", $search);
                $query->bindValue(":employee_middle_name", $search);
                $query->bindValue(":employee_last_name", $search);
                $query->bindValue(":employee_email", $search);
                $query->bindValue(":department_name", $search);
            }

            $query->execute();
        } catch (PDOException $e) {
            $query = false;
        }
        return $query;
    }

    // READ
    public function readLimit()
    {
        try {
            $sql = "select ";
            $sql .= "employee_aid, ";
            $sql .= "employee_is_active, ";
            $sql .= "employee_first_name, ";
            $sql .= "employee_middle_name, ";
            $sql .= "employee_last_name, ";
            $sql .= "employee_email, ";
            $sql .= "employee_department_id, ";
            $sql .= "department.department_name, ";
            $sql .= "employee_created, ";
            $sql .= "employee_updated ";
            $sql .= " from {$this->tblEmployees} ";
            $sql .= " left join {$this->tblSettingsDepartment} as department ";
            $sql .= " on department.department_aid = employee_department_id ";
            $sql .= " where true ";
            $sql .= $this->employee_is_active !== null && $this->employee_is_active !== "" ? " and employee_is_active = :employee_is_active " : " ";
            $sql .= $this->search != "" ? " and ( " : " ";
            $sql .= $this->search != "" ? "employee_first_name like :employee_first_name " : " ";
            $sql .= $this->search != "" ? "or employee_middle_name like :employee_middle_name " : " ";
            $sql .= $this->search != "" ? "or employee_last_name like :employee_last_name " : " ";
            $sql .= $this->search != "" ? "or employee_email like :employee_email " : " ";
            $sql .= $this->search != "" ? "or department.department_name like :department_name " : " ";
            $sql .= $this->search != "" ? " )" : " ";
            $sql .= " order by employee_aid desc ";
            $sql .= " limit :start, ";
            $sql .= " :total ";
            $query = $this->connection->prepare($sql);
            $query->bindValue(":start", (int) $this->start - 1, PDO::PARAM_INT);
            $query->bindValue(":total", (int) $this->total, PDO::PARAM_INT);

            if ($this->employee_is_active !== null && $this->employee_is_active !== "") {
                $query->bindValue(":employee_is_active", $this->employee_is_active);
            }

            if ($this->search != "") {
                $search = "%{$this->search}%";
                $query->bindValue(":employee_first_name", $search);
                $query->bindValue(":employee_middle_name", $search);
                $query->bindValue(":employee_last_name", $search);
                $query->bindValue(":employee_email", $search);
                $query->bindValue(":department_name", $search);
            }

            $query->execute();
        } catch (PDOException $e) {
            $query = false;
        }
        return $query;
    }
    // UPDATE
    public function update()
    {
        try {
            $sql = "update {$this->tblEmployees} set ";
            $sql .= "employee_first_name = :employee_first_name, ";
            $sql .= "employee_middle_name = :employee_middle_name, ";
            $sql .= "employee_last_name = :employee_last_name, ";
            $sql .= "employee_email = :employee_email, ";
            $sql .= "employee_department_id = :employee_department_id, ";
            $sql .= "employee_updated = :employee_updated ";
            $sql .= "where employee_aid = :employee_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "employee_first_name" => $this->employee_first_name,
                "employee_middle_name" => $this->employee_middle_name,
                "employee_last_name" => $this->employee_last_name,
                "employee_email" => $this->employee_email,
                "employee_department_id" => $this->employee_department_id,
                "employee_updated" => $this->employee_updated,
                "employee_aid" => $this->employee_aid,
            ]);
        } catch (PDOException $e) {
            returnError($e);
            $query = false;
        }
        return $query;
    }

    // active
    public function active()
    {
        try {
            $sql = "update {$this->tblEmployees} set ";
            $sql .= "employee_is_active = :employee_is_active, ";
            $sql .= "employee_updated = :employee_updated ";
            $sql .= "where employee_aid = :employee_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "employee_is_active" => $this->employee_is_active,
                "employee_updated" => $this->employee_updated,
                "employee_aid" => $this->employee_aid,
            ]);
        } catch (PDOException $e) {
            // returnError($e); // use this error if invalid request error
            $query = false;
        }
        return $query;
    }

    // delete
    public function delete()
    {
        try {
            $sql = "delete from {$this->tblEmployees} ";
            $sql .= "where employee_aid = :employee_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "employee_aid" => $this->employee_aid,
            ]);
        } catch (PDOException $e) {
            // returnError($e); // use this error if invalid request error
            $query = false;
        }
        return $query;
    }

    public function checkName()
    {
        try {
            $sql = "select ";
            $sql .= "employee_first_name ";
            $sql .= "from {$this->tblEmployees} ";
            $sql .= "where employee_first_name = :employee_first_name ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "employee_first_name" => $this->employee_first_name,
            ]);
        } catch (PDOException $e) {
            $query = false;
        }
        return $query;
    }

    public function checkEmail()
    {
        try {
            $sql = "select ";
            $sql .= "employee_email ";
            $sql .= "from {$this->tblEmployees} ";
            $sql .= "where employee_email = :employee_email ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "employee_email" => $this->employee_email,
            ]);
        } catch (PDOException $e) {
            $query = false;
        }
        return $query;
    }

    public function checkDepartment()
    {
        try {
            $sql = "select department_aid ";
            $sql .= "from {$this->tblSettingsDepartment} ";
            $sql .= "where department_aid = :department_aid ";
            $sql .= "and department_is_active = 1 ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "department_aid" => $this->employee_department_id,
            ]);
        } catch (PDOException $e) {
            $query = false;
        }
        return $query;
    }
}
