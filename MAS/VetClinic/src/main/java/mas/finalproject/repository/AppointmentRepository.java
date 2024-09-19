package mas.finalproject.repository;

import mas.finalproject.model.Appointment;
import org.springframework.data.repository.CrudRepository;

public interface AppointmentRepository  extends CrudRepository<Appointment, Long> {
}
