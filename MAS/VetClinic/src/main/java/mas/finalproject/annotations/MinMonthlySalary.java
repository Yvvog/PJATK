package mas.finalproject.annotations;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * Custom annotation for monthly salary to check if it is not smaller than previous it's value
 */
@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
public @interface MinMonthlySalary {
    String message() default "Monthly salary cannot be lower than the previous value.";
}