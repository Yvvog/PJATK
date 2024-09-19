package mas.finalproject.repository;

import mas.finalproject.model.Mammal;
import org.springframework.data.repository.CrudRepository;

public interface MammalRepository  extends CrudRepository<Mammal, Long> {
}
