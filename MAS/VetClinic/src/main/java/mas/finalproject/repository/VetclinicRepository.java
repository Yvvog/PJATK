package mas.finalproject.repository;

import mas.finalproject.model.Vetclinic;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface VetclinicRepository extends CrudRepository<Vetclinic, Long> {
    public List<Vetclinic> findByName(String name);

    @Query("from Vetclinic as c where c.rating > :minRat")
    public List<Vetclinic> findVetclinicWithRatingGreaterThan(@Param("minRat") double minRating);

    @Query("from Vetclinic d where d.address.street = :street")
    public List<Vetclinic> findByStreetAddress(@Param("street") String street);

    @Query("from Vetclinic as v left join fetch v.employees where v.id=:id")
    public Optional<Vetclinic> findById(@Param("id") Long id);
}
