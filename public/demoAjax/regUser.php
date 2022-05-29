<?php


/**
 * src/scripts/newUser.php
 *
 * @license https://opensource.org/licenses/MIT MIT License
 * @link    http://www.etsisi.upm.es/ ETS de Ingeniería de Sistemas Informáticos
 */

require '../../src/scripts/inicio.php';

use TDW\ACiencia\Entity\Role;
use TDW\ACiencia\Entity\User;
use TDW\ACiencia\Utility\DoctrineConnector;

try {
    $num = random_int(0, 100000);
    //$role = Role::ROLES[$num % 2];
    $role = Role::ROLES[0];
    $name = $_POST['name' ];
    $email=$_POST['email' ];
    $pwd=$_POST['password'];
    $estado='desactivada';

    $entityManager = DoctrineConnector::getEntityManager();
    $user = new User($name, $email , $pwd, $role,$estado);

    $entityManager->persist($user);
    $entityManager->flush();
    echo $user->getUsername();
} catch (Throwable $e) {
    exit('ERROR (' . $e->getCode() . '): ' . $e->getMessage());
}