package mas.finalproject.services;

import mas.finalproject.model.Animal;

import java.util.List;

public interface AnimalService {

    List<Animal> getAllAnimals();

    Animal findById(Long id);

    void save(Animal an);
}
