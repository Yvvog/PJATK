package mas.finalproject.services;

import mas.finalproject.model.Vetclinic;

public interface VetclinicService {

    void save(Vetclinic vet);

    boolean existByName(String name);
}
