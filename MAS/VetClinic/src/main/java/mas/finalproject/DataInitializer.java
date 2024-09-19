package mas.finalproject;

import lombok.RequiredArgsConstructor;
import mas.finalproject.model.*;
import mas.finalproject.repository.*;
import mas.finalproject.services.impl.AnimalServiceImpl;
import mas.finalproject.services.impl.AppointmentServiceImpl;
import mas.finalproject.services.impl.EmployeeServiceImpl;
import mas.finalproject.services.impl.VetclinicServiceImpl;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.EnumSet;

@Component
@RequiredArgsConstructor
public class DataInitializer {

    private final AnimalServiceImpl animalService;
    private final VetclinicServiceImpl vetclinicService;
    private final EmployeeServiceImpl employeeService;
    private final AppointmentServiceImpl appointmentService;

    @EventListener
    public void atStart(ContextRefreshedEvent ev) {
        if (vetclinicService.existByName("VetPet")) { //check if these values are already written in
            System.out.println("Data fill");
            Vetclinic vetclinic = Vetclinic.builder().name("VetPet").address(Address.builder().street("Levinska").number(12).build()).build();
            vetclinicService.save(vetclinic);
            Mammal animal1 = Mammal.builder().name("Lucky").arrivalDate(LocalDate.parse("2020-02-02")).breed(Breed.INBRED).build();
            Mammal animal2 = Mammal.builder().name("Amigo").arrivalDate(LocalDate.parse("2018-07-14")).breed(Breed.OUTBRED).build();
            Mammal animal3 = Mammal.builder().name("Margo").arrivalDate(LocalDate.parse("2021-11-11")).breed(Breed.OUTBRED).build();
            Mammal animal4 = Mammal.builder().name("Susha").arrivalDate(LocalDate.parse("2022-02-12")).breed(Breed.INBRED).build().setBreedOfAn("Cocker");
            Mammal animal5 = Mammal.builder().name("Keigo").arrivalDate(LocalDate.parse("2017-09-18")).breed(Breed.OUTBRED).build().addCombination("HuskyLab");
            animalService.save(animal1);
            animalService.save(animal2);
            animalService.save(animal3);
            animalService.save(animal4);
            animalService.save(animal5);
            Employee doctor1 = Employee.builder().name("Stefan").surname("Kozyk").employmentDate(LocalDate.parse("1990-03-03")).monthlySalary(2500).roles(EnumSet.of(Role.DOCTOR, Role.ADMINISTRATOR)).worksIn(vetclinic).build();
            employeeService.save(doctor1);
            Appointment appointment1 = Appointment.builder().date(LocalDate.parse("2020-11-11")).doctor(doctor1).animal(animal3).diagnosis("Broken Leg").build();
            Appointment appointment2 = Appointment.builder().date(LocalDate.parse("2018-08-14")).doctor(doctor1).animal(animal2).diagnosis("Heart disease").build();
            Appointment appointment3 = Appointment.builder().date(LocalDate.parse("2021-01-23")).doctor(doctor1).animal(animal1).diagnosis("Eye infection").build();
            Appointment appointment4 = Appointment.builder().date(LocalDate.parse("2020-03-27")).doctor(doctor1).animal(animal1).diagnosis("Eye infection").build();
            Appointment appointment5 = Appointment.builder().date(LocalDate.parse("2025-05-09")).doctor(doctor1).animal(animal1).diagnosis("Eye infection").build();
            appointmentService.save(appointment1);
            appointmentService.save(appointment2);
            appointmentService.save(appointment3);
            appointmentService.save(appointment4);
            appointmentService.save(appointment5);
        } else {
            System.out.println("Data exist");
        }
    }
}
