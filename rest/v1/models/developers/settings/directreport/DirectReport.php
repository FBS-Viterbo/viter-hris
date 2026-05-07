<?php

class DirectReport
{
    public $direct_report_aid;
    public $direct_report_is_active;
    public $direct_report_subordinate_id;
    public $direct_report_supervisor_id;
    public $direct_report_created;
    public $direct_report_updated;

    public $start;
    public $total;
    public $search;
    public $lastInsertedId;

    public $connection;
    public $tblSettingsDirectReport;
    public $tblEmployees;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblSettingsDirectReport = "settings_direct_report";
        $this->tblEmployees = "employees";
        $this->ensureSchema();
    }

    private function ensureSchema()
    {
        try {
            $this->connection->exec(
                "create table if not exists {$this->tblSettingsDirectReport} (
                    direct_report_aid int(11) not null auto_increment,
                    direct_report_is_active tinyint(1) not null,
                    direct_report_subordinate_id varchar(20) not null,
                    direct_report_supervisor_id varchar(20) not null,
                    direct_report_created datetime not null,
                    direct_report_updated datetime not null,
                    primary key (direct_report_aid),
                    unique key direct_report_subordinate_unique (direct_report_subordinate_id)
                ) engine=InnoDB default charset=utf8mb4 collate=utf8mb4_general_ci"
            );

            $columns = [
                "employee_supervisor_id" => "varchar(20) NOT NULL DEFAULT ''",
                "employee_supervisor_first_name" => "varchar(128) NOT NULL DEFAULT ''",
                "employee_supervisor_last_name" => "varchar(128) NOT NULL DEFAULT ''",
                "employee_supervisor_email" => "varchar(255) NOT NULL DEFAULT ''",
            ];

            foreach ($columns as $column => $definition) {
                $check = $this->connection->prepare(
                    "select column_name from information_schema.columns where table_schema = database() and table_name = :table_name and column_name = :column_name"
                );
                $check->execute([
                    "table_name" => $this->tblEmployees,
                    "column_name" => $column,
                ]);

                if ($check->rowCount() === 0) {
                    $this->connection->exec("alter table {$this->tblEmployees} add {$column} {$definition}");
                }
            }
        } catch (PDOException $e) {
            returnError($e->getMessage());
        }
    }

    public function create()
    {
        try {
            $this->connection->beginTransaction();

            $sql = "insert into {$this->tblSettingsDirectReport} ";
            $sql .= "(direct_report_is_active, direct_report_subordinate_id, direct_report_supervisor_id, direct_report_created, direct_report_updated) ";
            $sql .= "values (:direct_report_is_active, :direct_report_subordinate_id, :direct_report_supervisor_id, :direct_report_created, :direct_report_updated) ";
            $sql .= "on duplicate key update ";
            $sql .= "direct_report_is_active = values(direct_report_is_active), ";
            $sql .= "direct_report_supervisor_id = values(direct_report_supervisor_id), ";
            $sql .= "direct_report_updated = values(direct_report_updated) ";

            $query = $this->connection->prepare($sql);
            $query->execute([
                "direct_report_is_active" => $this->direct_report_is_active,
                "direct_report_subordinate_id" => $this->direct_report_subordinate_id,
                "direct_report_supervisor_id" => $this->direct_report_supervisor_id,
                "direct_report_created" => $this->direct_report_created,
                "direct_report_updated" => $this->direct_report_updated,
            ]);

            $this->lastInsertedId = $this->connection->lastInsertId();
            $this->updateEmployeeSupervisor();
            $this->connection->commit();
        } catch (PDOException $e) {
            if ($this->connection->inTransaction()) {
                $this->connection->rollBack();
            }
            returnError($e->getMessage());
            $query = false;
        }

        return $query;
    }

    public function readAll()
    {
        try {
            $sql = "select ";
            $sql .= "direct_report.direct_report_aid, ";
            $sql .= "direct_report.direct_report_is_active, ";
            $sql .= "direct_report.direct_report_subordinate_id, ";
            $sql .= "direct_report.direct_report_supervisor_id, ";
            $sql .= "subordinate.employee_first_name as subordinate_first_name, ";
            $sql .= "subordinate.employee_last_name as subordinate_last_name, ";
            $sql .= "subordinate.employee_email as subordinate_email, ";
            $sql .= "supervisor.employee_first_name as supervisor_first_name, ";
            $sql .= "supervisor.employee_last_name as supervisor_last_name, ";
            $sql .= "supervisor.employee_email as supervisor_email, ";
            $sql .= "direct_report.direct_report_created, ";
            $sql .= "direct_report.direct_report_updated ";
            $sql .= "from {$this->tblSettingsDirectReport} as direct_report ";
            $sql .= "left join {$this->tblEmployees} as subordinate on subordinate.employee_aid = direct_report.direct_report_subordinate_id ";
            $sql .= "left join {$this->tblEmployees} as supervisor on supervisor.employee_aid = direct_report.direct_report_supervisor_id ";
            $sql .= "where true ";
            $sql .= $this->direct_report_is_active !== null && $this->direct_report_is_active !== "" ? "and direct_report.direct_report_is_active = :direct_report_is_active " : " ";
            $sql .= $this->search != "" ? "and (subordinate.employee_first_name like :search_subordinate_first_name or subordinate.employee_last_name like :search_subordinate_last_name or subordinate.employee_email like :search_subordinate_email or supervisor.employee_first_name like :search_supervisor_first_name or supervisor.employee_last_name like :search_supervisor_last_name or supervisor.employee_email like :search_supervisor_email) " : " ";
            $sql .= "order by subordinate.employee_first_name asc, subordinate.employee_last_name asc ";

            $query = $this->connection->prepare($sql);
            $this->bindReadParams($query);
            $query->execute();
        } catch (PDOException $e) {
            returnError($e->getMessage());
            $query = false;
        }

        return $query;
    }

    public function readLimit()
    {
        try {
            $sql = "select ";
            $sql .= "direct_report.direct_report_aid, ";
            $sql .= "direct_report.direct_report_is_active, ";
            $sql .= "direct_report.direct_report_subordinate_id, ";
            $sql .= "direct_report.direct_report_supervisor_id, ";
            $sql .= "subordinate.employee_first_name as subordinate_first_name, ";
            $sql .= "subordinate.employee_last_name as subordinate_last_name, ";
            $sql .= "subordinate.employee_email as subordinate_email, ";
            $sql .= "supervisor.employee_first_name as supervisor_first_name, ";
            $sql .= "supervisor.employee_last_name as supervisor_last_name, ";
            $sql .= "supervisor.employee_email as supervisor_email, ";
            $sql .= "direct_report.direct_report_created, ";
            $sql .= "direct_report.direct_report_updated ";
            $sql .= "from {$this->tblSettingsDirectReport} as direct_report ";
            $sql .= "left join {$this->tblEmployees} as subordinate on subordinate.employee_aid = direct_report.direct_report_subordinate_id ";
            $sql .= "left join {$this->tblEmployees} as supervisor on supervisor.employee_aid = direct_report.direct_report_supervisor_id ";
            $sql .= "where true ";
            $sql .= $this->direct_report_is_active !== null && $this->direct_report_is_active !== "" ? "and direct_report.direct_report_is_active = :direct_report_is_active " : " ";
            $sql .= $this->search != "" ? "and (subordinate.employee_first_name like :search_subordinate_first_name or subordinate.employee_last_name like :search_subordinate_last_name or subordinate.employee_email like :search_subordinate_email or supervisor.employee_first_name like :search_supervisor_first_name or supervisor.employee_last_name like :search_supervisor_last_name or supervisor.employee_email like :search_supervisor_email) " : " ";
            $sql .= "order by subordinate.employee_first_name asc, subordinate.employee_last_name asc ";
            $sql .= "limit :start, :total ";

            $query = $this->connection->prepare($sql);
            $query->bindValue(":start", (int) $this->start - 1, PDO::PARAM_INT);
            $query->bindValue(":total", (int) $this->total, PDO::PARAM_INT);
            $this->bindReadParams($query);
            $query->execute();
        } catch (PDOException $e) {
            returnError($e->getMessage());
            $query = false;
        }

        return $query;
    }

    public function checkEmployee($employeeId)
    {
        try {
            $sql = "select employee_aid, employee_first_name, employee_last_name, employee_email ";
            $sql .= "from {$this->tblEmployees} ";
            $sql .= "where employee_aid = :employee_aid and employee_is_active = 1 ";
            $query = $this->connection->prepare($sql);
            $query->execute(["employee_aid" => $employeeId]);
        } catch (PDOException $e) {
            returnError($e->getMessage());
            $query = false;
        }

        return $query;
    }

    public function checkReverseAssignment()
    {
        try {
            $sql = "select direct_report_aid ";
            $sql .= "from {$this->tblSettingsDirectReport} ";
            $sql .= "where direct_report_subordinate_id = :supervisor_id ";
            $sql .= "and direct_report_supervisor_id = :subordinate_id ";
            $sql .= "and direct_report_is_active = 1 ";
            $sql .= "limit 1 ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "supervisor_id" => $this->direct_report_supervisor_id,
                "subordinate_id" => $this->direct_report_subordinate_id,
            ]);
        } catch (PDOException $e) {
            returnError($e->getMessage());
            $query = false;
        }

        return $query;
    }

    private function bindReadParams($query)
    {
        if ($this->direct_report_is_active !== null && $this->direct_report_is_active !== "") {
            $query->bindValue(":direct_report_is_active", $this->direct_report_is_active);
        }

        if ($this->search != "") {
            $search = "%{$this->search}%";
            $query->bindValue(":search_subordinate_first_name", $search);
            $query->bindValue(":search_subordinate_last_name", $search);
            $query->bindValue(":search_subordinate_email", $search);
            $query->bindValue(":search_supervisor_first_name", $search);
            $query->bindValue(":search_supervisor_last_name", $search);
            $query->bindValue(":search_supervisor_email", $search);
        }
    }

    private function updateEmployeeSupervisor()
    {
        $sql = "update {$this->tblEmployees} as subordinate ";
        $sql .= "join {$this->tblEmployees} as supervisor on supervisor.employee_aid = :supervisor_id ";
        $sql .= "set subordinate.employee_supervisor_id = supervisor.employee_aid, ";
        $sql .= "subordinate.employee_supervisor_first_name = supervisor.employee_first_name, ";
        $sql .= "subordinate.employee_supervisor_last_name = supervisor.employee_last_name, ";
        $sql .= "subordinate.employee_supervisor_email = supervisor.employee_email, ";
        $sql .= "subordinate.employee_updated = :employee_updated ";
        $sql .= "where subordinate.employee_aid = :subordinate_id ";

        $query = $this->connection->prepare($sql);
        $query->execute([
            "supervisor_id" => $this->direct_report_supervisor_id,
            "subordinate_id" => $this->direct_report_subordinate_id,
            "employee_updated" => $this->direct_report_updated,
        ]);
    }
}
