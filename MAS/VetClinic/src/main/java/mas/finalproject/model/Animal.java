package mas.finalproject.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import lombok.experimental.Accessors;
import lombok.experimental.SuperBuilder;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.HashSet;
import java.util.Set;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Inheritance(strategy = InheritanceType.JOINED)
@SuperBuilder
@ToString
public abstract class Animal {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotBlank(message = "Name is mandatory")
    @Size(min = 2, max = 255)
    @Pattern(regexp = "^[a-zA-Z]+$")
    private String name;

    @NotNull
    @Past //allows only dates from the past
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate arrivalDate;

    @NotNull
    @Enumerated(EnumType.STRING) //enumerated type
    @Column(updatable = false) //cannot change a breed
    private Breed breed;

    @Column(nullable = true)
    @ElementCollection
    private Set<String> combinations;

    @Column(nullable = true)
    private String breedOfAn;

    /**
     * custom constructor to implement multi-aspect
     */
    public Animal(Breed breed, Long id, String name, LocalDate arrivalDate, String combination, String breedOfAn) {
        setId(id);
        setName(name);
        setArrivalDate(arrivalDate);
        setBreed(breed);
        if (breed.equals(Breed.INBRED)) { //check the breed
            if (breedOfAn.isBlank()) {
                throw new IllegalArgumentException("Breed of animal is mandatory for Inbred"); //mandatory
            }
            setBreedOfAn(breedOfAn); //set its attribute
        } else {
            breedOfAn = null; //otherwise, set nothing
        }
        if (breed.equals(Breed.OUTBRED)) { //check the breed
            if (combination.isBlank()) {
                throw new IllegalArgumentException("Combination is mandatory for Outbred"); //mandatory
            }
            addCombination(combination); //add the attribute to the set
        } else {
            combinations = null; //otherwise, set nothing
        }
    }

    @ManyToOne
    @JoinColumn(name = "owner_id", nullable = true)
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private Owner owner;

    @OneToMany(mappedBy = "animal", cascade = {CascadeType.REMOVE})
    @ToString.Exclude
    @Builder.Default
    @EqualsAndHashCode.Exclude
    private Set<Appointment> appointments = new HashSet<>();

    @OneToMany(mappedBy = "animal", cascade = CascadeType.REMOVE)
    @ToString.Exclude
    @Builder.Default
    @EqualsAndHashCode.Exclude
    private Set<MedBook> medBooks = new HashSet<>();

    @OneToMany(mappedBy = "animal", cascade = CascadeType.REMOVE)
    @ToString.Exclude
    @Builder.Default
    @EqualsAndHashCode.Exclude
    private Set<Analysis> analyses = new HashSet<>();

    /**
     * custom XOR annotation/validation
     */
    @AssertTrue(message = "Animal must have either MedBooks or Analyses, but not both.")
    @Transient
    public boolean isXORValid() {
        if (medBooks.isEmpty() && analyses.isEmpty()) {
            return true;
        }
        return ((medBooks == null || medBooks.isEmpty()) && (analyses != null || analyses.isEmpty())) || ((medBooks != null || medBooks.isEmpty()) && (analyses == null || analyses.isEmpty()));
    }

    /**
     * check XOR before saving an animal or creating new connections
     */
    @PrePersist
    @PreUpdate
    private void validateXOR() {
        if (!isXORValid()) {
            throw new IllegalStateException("Animal must have either MedBooks or Analyses");
        }
    }

    public Animal addCombination(String comb) {
        if (!breed.equals(Breed.OUTBRED)) {
            throw new IllegalArgumentException("only outbred have combinations");
        }
        if (comb == null || comb.isBlank()) {
            throw new IllegalArgumentException("cannot be null comb");
        }
        combinations.add(comb);
        return this;
    }

    /**
     * override the setter to custom one, to check the access
     */
    public Animal setBreedOfAn(String breedOfAn) {
        if (breed.equals(Breed.INBRED)) {
            if (breedOfAn == null || breedOfAn.isBlank()) {
                throw new IllegalArgumentException("Bred shouldn't be empty");
            }
            this.breedOfAn = breedOfAn;
        } else {
            throw new IllegalArgumentException("cannot set bred on OUTBRED");
        }
        return this;
    }

}
