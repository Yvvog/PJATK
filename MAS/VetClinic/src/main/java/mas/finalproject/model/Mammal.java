package mas.finalproject.model;

import jakarta.persistence.Entity;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import java.util.HashSet;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@ToString
public class Mammal extends Animal {
    @NotNull
    private boolean trained;

    @Override
    public Mammal setBreedOfAn(String breedOfAn) {
        super.setBreedOfAn(breedOfAn);
        return this;
    }

    @Override
    public Mammal addCombination(String comb) {
        if (!this.getBreed().equals(Breed.OUTBRED)) {
            throw new IllegalArgumentException("only outbred have combinations");
        }
        if (comb == null || comb.isBlank()) {
            throw new IllegalArgumentException("cannot be null comb");
        }
        if (this.getCombinations() == null) {
            this.setCombinations(new HashSet<>());
        }
        this.getCombinations().add(comb);
        return this;
    }
}
