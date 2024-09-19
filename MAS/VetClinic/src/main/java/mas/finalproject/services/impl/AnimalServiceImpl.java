package mas.finalproject.services.impl;

import mas.finalproject.model.Animal;
import mas.finalproject.repository.AnimalRepository;
import mas.finalproject.services.AnimalService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AnimalServiceImpl implements AnimalService {

    private AnimalRepository animalRepository;

    public AnimalServiceImpl(AnimalRepository animalRepository) {
        super();
        this.animalRepository = animalRepository;
    }

    @Override
    public List<Animal> getAllAnimals() {
        return (List<Animal>) animalRepository.findAll();
    }

    @Override
    public Animal findById(Long id) {
        return animalRepository.findById(id).get();
    }

    @Override
    public void save(Animal an) {
        animalRepository.save(an);
    }

}
