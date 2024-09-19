package mas.finalproject.controllers;

import lombok.AllArgsConstructor;
import mas.finalproject.model.Appointment;
import mas.finalproject.repository.AnimalRepository;
import mas.finalproject.repository.AppointmentRepository;
import mas.finalproject.services.AnimalService;
import mas.finalproject.services.impl.AppointmentServiceImpl;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.ui.Model;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Set;

/**
 * Controller using Appointment Repository to connect pages
 */
@Controller
@RequestMapping("/appointments")
@AllArgsConstructor
public class AppointmentController {

    private AppointmentServiceImpl appointmentService;

    /**
     * for List page
     */
    @GetMapping("/list")
    public String showList(Model model) {
        model.addAttribute("apps", appointmentService.getAllAppointments());
        return "Appointments";
    }

    /**
     * for information page
     */
    @GetMapping("/{id}")
    public String showInfo(Model model, @PathVariable Long id) {
        model.addAttribute("app", appointmentService.findById(id));
        return "AppointmentInfo";
    }

    /**
     * for information page using the select button
     */
    @GetMapping("/info")
    public String getAppInfo(@RequestParam("appSelect") Long selectedValue, Model model) {
        model.addAttribute("app", appointmentService.findById(selectedValue));
        return "AppointmentInfo";
    }

    /**
     * to delete value from the database
     */
    @PostMapping("/delete")
    public String delete(Model model, @RequestParam("deleteId") Long selectedValue) {
        appointmentService.deleteById(selectedValue);
        return "redirect:/animals/list";
    }
}
