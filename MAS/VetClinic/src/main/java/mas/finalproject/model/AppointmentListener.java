package mas.finalproject.model;

import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;

/**
 * helper to assign value to the attribute state based on the current date before creation or updating
 */
public class AppointmentListener {
    @PrePersist
    @PreUpdate
    public void beforePersistOrUpdate(Appointment appointment) {
        appointment.setState(determineState(appointment.getDate()));
    }

    private State determineState(LocalDate date) {
        DateTimeFormatter formatter1 = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate now = LocalDate.now();
        if (ChronoUnit.YEARS.between(now, LocalDate.parse(date.toString(), formatter1)) < 1) { //calculate the difference between now and date of the appointment
            return State.PAST;
        } else {
            return State.PLANED;
        }
    }
}

