package mas.finalproject.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.hibernate.validator.constraints.UniqueElements;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class MedBook {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    /**
     * Unique attribute
     */
    @NotBlank(message = "SerialNumber is mandatory")
    @Size(min = 2, max = 255)
    @Pattern(regexp = "/^[A-Za-z0-9]*$/")
    @Column(unique = true)
    private String serialNumber;

    @ManyToOne(optional = false)
    @JoinColumn(name = "animal_id", nullable = false, updatable = false)
    @Setter(AccessLevel.PRIVATE)
    private Animal animal;
}
