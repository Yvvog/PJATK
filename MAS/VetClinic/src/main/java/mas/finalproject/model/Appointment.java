package mas.finalproject.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(uniqueConstraints = {
        @UniqueConstraint(columnNames = {"doctor_id", "animal_id", "date"}) //unique appointment
})
@EntityListeners(AppointmentListener.class) //use it for calculation state
@ToString
public class Appointment implements Comparable<Appointment> { //implementation of the comparator is necessary for custom comparing
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotNull
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate date;

    @ManyToOne
    @JoinColumn(name = "doctor_id", nullable = false)
    @NotNull
    @Setter(AccessLevel.PRIVATE)
    private Employee doctor;

    @ManyToOne
    @JoinColumn(name = "animal_id", nullable = false)
    @NotNull
    @Setter(AccessLevel.PRIVATE)
    private Animal animal;

    @NotBlank(message = "Name is mandatory")
    @Size(min = 2, max = 255)
    private String diagnosis;

    @NotNull
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private State state;

    /**
     * custom comparator by date
     */
    @Override
    public int compareTo(Appointment o) {
        return this.date.compareTo(o.date);
    }

}
