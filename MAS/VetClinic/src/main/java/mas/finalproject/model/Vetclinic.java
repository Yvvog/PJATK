package mas.finalproject.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class Vetclinic {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotBlank(message = "Name is mandatory")
    @Size(min = 2, max = 255)
    @Pattern(regexp = "^[a-zA-Z]+$")
    private String name;

    /**optional attribute*/
    @Min(0)
    @Max(5)
    @Column(nullable = true)
    private Integer rating;

    /**complex (embedded) attribute*/
    @NotNull
    @Embedded
    private Address address;

    /**class attribute*/
    @Size(min = 2, max = 255)
    @Pattern(regexp = "^[0-9]")
    private static String sosnumber;

    @OneToMany(mappedBy = "worksIn", fetch = FetchType.LAZY)
    @Builder.Default
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private Set<Employee> employees = new HashSet<>();

}
