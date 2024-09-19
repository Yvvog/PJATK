package mas.finalproject.services.impl;

import mas.finalproject.model.Employee;
import mas.finalproject.model.Role;
import mas.finalproject.repository.AnimalRepository;
import mas.finalproject.repository.EmployeeRepository;
import mas.finalproject.services.EmployeeService;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class EmployeeServiceImpl implements EmployeeService {

    EmployeeRepository employeeRepository;

    public EmployeeServiceImpl(EmployeeRepository employeeRepository) {
        super();
        this.employeeRepository = employeeRepository;
    }

    @Override
    public void save(Employee emp) {
        employeeRepository.save(emp);
    }

    @Override
    public Employee findById(Long id) {
        return employeeRepository.findById(id).get();
    }

    /**
     * methods to change/remove roles
     */

    @Override
    public void changeToSecurity(Employee employee, String shift) {
        if (!employee.getRoles().contains(Role.SECURITY)) {
            employee.getRoles().add(Role.SECURITY);
            employee.setShift(shift);
            employeeRepository.save(employee);
        }
    }

    @Override
    public void changeToAdministrator(Employee employee, Set<String> computerSkills) {
        if (!employee.getRoles().contains(Role.ADMINISTRATOR)) {
            employee.getRoles().add(Role.ADMINISTRATOR);
            employee.setComputerSkills(computerSkills);
            employeeRepository.save(employee);
        }
    }

    @Override
    public void changeToDoctor(Employee employee, Set<String> certificates) {
        if (!employee.getRoles().contains(Role.DOCTOR)) {
            employee.getRoles().add(Role.DOCTOR);
            employee.setCertificates(certificates);
            employeeRepository.save(employee);
        }
    }

    @Override
    public void removeSecurityRole(Employee employee) {
        checkLastRole(employee);
        if (employee.getRoles().contains(Role.SECURITY)) {
            employee.setShift(null);
            employee.getRoles().remove(Role.SECURITY);
            employeeRepository.save(employee);
        }
    }

    @Override
    public void removeAdministratorRole(Employee employee) {
        checkLastRole(employee);
        if (employee.getRoles().contains(Role.ADMINISTRATOR)) {
            employee.setComputerSkills(null);
            employee.getRoles().remove(Role.ADMINISTRATOR);
            employeeRepository.save(employee);
        }
    }

    @Override
    public void removeDoctorRole(Employee employee) {
        checkLastRole(employee);
        if (employee.getRoles().contains(Role.DOCTOR)) {
            employee.setCertificates(null);
            employee.getRoles().remove(Role.DOCTOR);
            employeeRepository.save(employee);
        }
    }

    private void checkLastRole(Employee employee) {
        if (employee.getRoles().size() - 1 == 0) {
            throw new IllegalArgumentException("cannot delete last role");
        }
    }

}
