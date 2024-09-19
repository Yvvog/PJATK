package mas.finalproject.repository;

import mas.finalproject.model.MedBook;
import org.springframework.data.repository.CrudRepository;

public interface MedBookRepository extends CrudRepository<MedBook, Long> {
}
