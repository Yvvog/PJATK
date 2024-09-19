package mas.finalproject.controllers;

import lombok.AllArgsConstructor;
import mas.finalproject.model.Appointment;
import mas.finalproject.repository.AnimalRepository;
import mas.finalproject.services.AnimalService;
import mas.finalproject.services.AppointmentService;
import mas.finalproject.services.impl.AnimalServiceImpl;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.ui.Model;

import java.util.*;
import java.util.stream.Collectors;

/**
 * Controller using Animal Repository to connect pages
 */
@Controller
@RequestMapping("/animals")
@AllArgsConstructor
public class AnimalController {

    private AnimalServiceImpl animalService;

    /**
     * for List Page
     */
    @GetMapping("/list")
    public String showList(Model model) {
        model.addAttribute("animals", animalService.getAllAnimals());
        return "Animals";
    }

    /**
     * for information page
     */
    @GetMapping("/{id}")
    public String showInfo(Model model, @PathVariable Long id) {
        model.addAttribute("animal", animalService.findById(id));
        Set<Appointment> set = animalService.findById(id).getAppointments(); //order appointments by date
        ArrayList arrayList = new ArrayList(set);
        Collections.sort(arrayList);
        model.addAttribute("appointments", arrayList);
        return "AnimalInfo";
    }

}
