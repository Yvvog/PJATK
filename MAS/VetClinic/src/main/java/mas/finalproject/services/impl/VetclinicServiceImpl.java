package mas.finalproject.services.impl;

import mas.finalproject.model.Vetclinic;
import mas.finalproject.repository.VetclinicRepository;
import mas.finalproject.services.VetclinicService;
import org.springframework.stereotype.Service;

@Service
public class VetclinicServiceImpl implements VetclinicService {

    private final VetclinicRepository vetclinicRepository;

    public VetclinicServiceImpl(VetclinicRepository vetclinicRepository) {
        super();
        this.vetclinicRepository = vetclinicRepository;
    }

    @Override
    public void save(Vetclinic vet) {
        vetclinicRepository.save(vet);
    }

    @Override
    public boolean existByName(String name) {
        return vetclinicRepository.findByName(name).isEmpty();
    }
}
