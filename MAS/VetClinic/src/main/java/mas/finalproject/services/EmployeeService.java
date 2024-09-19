package mas.finalproject.services;

import mas.finalproject.model.Animal;
import mas.finalproject.model.Appointment;
import mas.finalproject.model.Employee;

import java.util.Set;

public interface EmployeeService {

    void save(Employee emp);

    Employee findById(Long id);

    void changeToSecurity(Employee employee, String shift);
    void changeToAdministrator(Employee employee, Set<String> computerSkills);
    void changeToDoctor(Employee employee, Set<String> certificates);
    void removeSecurityRole(Employee employee);
    void removeAdministratorRole(Employee employee);
    void removeDoctorRole(Employee employee);
}
