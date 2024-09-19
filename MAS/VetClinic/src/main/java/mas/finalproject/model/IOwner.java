package mas.finalproject.model;

import jakarta.persistence.FetchType;
import jakarta.persistence.OneToMany;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import java.util.HashSet;
import java.util.Set;

public interface IOwner {

    @OneToMany(mappedBy = "owner", fetch = FetchType.LAZY)
    @Builder.Default
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    Set<Animal> pets = new HashSet<>();

    public void createMedBook(Animal pet, String serialnumber);
}
