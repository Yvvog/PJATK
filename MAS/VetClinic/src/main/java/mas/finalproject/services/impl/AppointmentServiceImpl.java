package mas.finalproject.services.impl;

import mas.finalproject.model.Appointment;
import mas.finalproject.repository.AppointmentRepository;
import mas.finalproject.services.AppointmentService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AppointmentServiceImpl implements AppointmentService {

    private AppointmentRepository appointmentRepository;

    public AppointmentServiceImpl(AppointmentRepository appointmentRepository) {
        super();
        this.appointmentRepository = appointmentRepository;
    }

    @Override
    public List<Appointment> getAllAppointments() {
        return (List<Appointment>) appointmentRepository.findAll();
    }

    @Override
    public Appointment findById(Long id) {
        return appointmentRepository.findById(id).get();
    }

    @Override
    public void deleteById(Long id) {
        appointmentRepository.delete(appointmentRepository.findById(id).get());
    }

    @Override
    public void save(Appointment app) {
        appointmentRepository.save(app);
    }
}
