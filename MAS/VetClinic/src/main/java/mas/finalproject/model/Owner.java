package mas.finalproject.model;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.HashSet;
import java.util.Set;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@ToString
public class Owner extends Person implements IOwner {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @OneToMany(mappedBy = "owner", fetch = FetchType.LAZY)
    @Builder.Default
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private Set<Animal> pets = new HashSet<>();

    @Override
    public void createMedBook(Animal pet, String serialnumber) {
        if (!pets.contains(pet)) {
            throw new IllegalArgumentException("not his pet");
        } else {
            MedBook mb = MedBook.builder().serialNumber("OW" + serialnumber).animal(pet).build();
            pet.getMedBooks().add(mb);
        }
    }
}
