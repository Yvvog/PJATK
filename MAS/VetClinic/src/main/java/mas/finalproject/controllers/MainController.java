package mas.finalproject.controllers;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Main Controller heading to the main page (in my case to list of animals
 */
@Controller
@RequestMapping("/")
public class MainController {

    @GetMapping("/")
    public String index() {
        return "redirect:/animals/list";
    }

}
