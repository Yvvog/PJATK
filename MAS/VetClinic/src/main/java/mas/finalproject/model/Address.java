package mas.finalproject.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

/**
 * Complex attribute
 */
@Embeddable //make the class embeddable and we can use it in another class as a field
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class Address {

    @NotBlank(message = "Name is mandatory")
    @Size(min = 2, max = 255)
    @Pattern(regexp = "/^[a-zA-Z]+$/")
    private String street;

    @Min(0)
    @Max(100)
    @NotNull
    private Integer number;

}
