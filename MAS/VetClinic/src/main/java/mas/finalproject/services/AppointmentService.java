package mas.finalproject.services;

import mas.finalproject.model.Animal;
import mas.finalproject.model.Appointment;

import java.util.List;

public interface AppointmentService {
    List<Appointment> getAllAppointments();

    Appointment findById(Long id);

    void deleteById(Long id);

    void save(Appointment app);
}
