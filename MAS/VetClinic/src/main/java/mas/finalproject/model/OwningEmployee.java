package mas.finalproject.model;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class OwningEmployee extends Employee implements IOwner {

    @NotBlank(message = "SpecialCardNumber is mandatory")
    @Size(min = 2, max = 25)
    @Pattern(regexp = "/^[A-Za-z0-9]*$/")
    private String specialCardNumber;

    @Override
    public void createMedBook(Animal pet, String serialnumber) {
        if (!pets.contains(pet)) {
            throw new IllegalArgumentException("not his pet");
        } else {
            MedBook mb = MedBook.builder().serialNumber("OWEM" + serialnumber).animal(pet).build();
            pet.getMedBooks().add(mb);
        }
    }
}
