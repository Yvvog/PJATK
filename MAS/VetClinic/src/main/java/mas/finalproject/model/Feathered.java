package mas.finalproject.model;

import jakarta.persistence.Entity;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@ToString
public class Feathered extends Animal {
    @NotNull
    private boolean specialSpecies;

    @Override
    public Feathered setBreedOfAn(String breedOfAn) {
        super.setBreedOfAn(breedOfAn);
        return this;
    }

    @Override
    public Feathered addCombination(String comb) {
        if (!this.getBreed().equals(Breed.OUTBRED)) {
            throw new IllegalArgumentException("only outbred have combinations");
        }
        if (comb == null || comb.isBlank()) {
            throw new IllegalArgumentException("cannot be null comb");
        }
        this.getCombinations().add(comb);
        return this;
    }
}
