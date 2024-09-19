package mas.finalproject.annotations;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import mas.finalproject.model.Employee;
import mas.finalproject.services.impl.EmployeeServiceImpl;

/**
 * Custom validation for monthly salary to check if it is not smaller than previous it's value
 */
public class MinMonthlySalaryValidator implements ConstraintValidator<MinMonthlySalary, Integer> {

    private Employee employee;
    private EmployeeServiceImpl employeeService;

    @Override
    public void initialize(MinMonthlySalary annotation) {
    }

    @Override
    public boolean isValid(Integer newValue, ConstraintValidatorContext context) {
        if (employee == null || newValue == null) {
            return true; // Skip validation if employee or new value is null
        }
        // Get the previous value from the database based on the employee
        Employee persistedEmployee = employeeService.findById(employee.getId());
        if (persistedEmployee == null) {
            return true; // Skip validation if employee does not exist
        }
        Integer previousValue = persistedEmployee.getMonthlySalary();
        return previousValue == null || newValue >= previousValue;
    }
}

