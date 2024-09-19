package mas.finalproject.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class Analysis {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotBlank(message = "Name is mandatory")
    @Size(min = 2, max = 255)
    private String name;

    @ManyToOne(optional = false)
    @JoinColumn(name = "animal_id", nullable = false, updatable = false)
    @Setter(AccessLevel.PRIVATE)
    private Animal animal;

    @Min(0)
    @Max(100)
    @Column(nullable = false)
    private Integer result;
}
