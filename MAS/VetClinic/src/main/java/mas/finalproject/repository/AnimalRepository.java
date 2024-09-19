package mas.finalproject.repository;

import mas.finalproject.model.Animal;
import mas.finalproject.model.Vetclinic;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AnimalRepository extends CrudRepository<Animal, Long> {

    @Query("FROM Animal a INNER JOIN Appointment ap ON a.id = ap.animal.id INNER JOIN Employee d ON ap.doctor.id = d.id WHERE d.id = :doctor_id")
    public List<Animal> findByDoctor(@Param("doctor_id") Long doctor_id);

    @Query("FROM Animal a INNER JOIN Owner o ON a.owner.id = o.id WHERE o.id = :owner_id")
    public List<Animal> findByOwner(@Param("owner_id") Long owner_id);
}
