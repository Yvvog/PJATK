package mas.finalproject.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import lombok.experimental.SuperBuilder;
import mas.finalproject.annotations.MinMonthlySalary;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.HashSet;
import java.util.Set;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@ToString
public class Employee extends Person implements IAdministrator, IDoctor, ISecurity { //implement roles
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    /**
     * Dynamic attribute with custom annotation
     */
    @NotNull
    @MinMonthlySalary
    private Integer monthlySalary;

    @NotNull
    @Past //allows only dates from the past
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate employmentDate;

    @NotNull
    @ElementCollection(targetClass = Role.class, fetch = FetchType.EAGER)
    @Enumerated(EnumType.STRING)
    private Set<Role> roles = new HashSet<>();

    @ElementCollection
    @CollectionTable(name = "certificates", joinColumns = @JoinColumn(name = "doctor_id"))
    @Builder.Default
    private Set<String> certificates = new HashSet<>();

    @Size(min = 2, max = 255)
    private String shift;

    @ElementCollection
    @CollectionTable(name = "computer_skills", joinColumns = @JoinColumn(name = "administrator_id"))
    @Builder.Default
    private Set<String> computerSkills = new HashSet<>();

    @NotNull
    @ManyToOne
    @JoinColumn(name = "vetclinic_id", nullable = false)
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private Vetclinic worksIn;

    @OneToMany(mappedBy = "doctor", cascade = {CascadeType.REMOVE})
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private Set<Appointment> appointments = new HashSet<>();

    /** custom constructor to correctly implement roles of employee (overlapping, dynamic)*/
    public Employee(Long id, String name, String surname, LocalDate employmentDate, Vetclinic worksIn, Set<Role> roles, String computerSkill, String shiftt, String certificate) {
        setId(id);
        setName(name);
        setSurname(surname);
        setEmploymentDate(employmentDate);
        setWorksIn(worksIn);
        setRoles(roles);
        if (roles.contains(Role.DOCTOR)) { //check the role
            addCertificate(certificate); //add value to set
        } else {
            certificates = null; //otherwise empty
        }
        if (roles.contains(Role.ADMINISTRATOR)) {
            addComputerSkill(computerSkill);
        } else {
            computerSkills = null;
        }
        if (roles.contains(Role.SECURITY)) {
            if (shiftt.isBlank()) {
                throw new IllegalArgumentException("Security should have shift");
            }
            shift = shiftt;
        } else {
            shift = null;
        }
    }

    /** custom setters with checking the roles */

    public Employee setCertificates(Set<String> certificatess) {
        if(this.roles.contains(Role.DOCTOR)){
            certificates=certificatess;
        } else {
            throw new IllegalArgumentException("cannot set certificates for a non-doctor");
        }
        return this;
    }

    public Employee setComputerSkills(Set<String> computerSkillss) {
        if(this.roles.contains(Role.ADMINISTRATOR)){
            computerSkills=computerSkillss;
        } else {
            throw new IllegalArgumentException("cannot set computer skills for a non-administrator");
        }
        return this;
    }
    public Employee setShift(String shiftt) {
        if(this.roles.contains(Role.SECURITY)){
            shift=shiftt;
        } else {
            throw new IllegalArgumentException("cannot set shift for a non-security");
        }
        return this;
    }

    @Override
    public void addCertificate(String cert) {
        if (cert == null || cert.isBlank()) {
            throw new IllegalArgumentException("Certificate shouldn't be empty");
        }
        if (this.certificates.contains(cert)) {
            throw new IllegalArgumentException("This certificate  already exist");
        }
        this.certificates.add(cert);
    }

    @Override
    public void removeCertificate(String cert) {
        if (cert == null || cert.isBlank()) {
            throw new IllegalArgumentException("Certificate cannot be empty");
        }
        if (this.certificates.size() - 1 <= 0) {
            throw new IllegalArgumentException("Cannot remove last certificate");
        }
        if (!this.certificates.contains(cert)) {
            throw new IllegalArgumentException("No such certificate");
        }
        this.certificates.remove(cert);
    }

    @Override
    public void addComputerSkill(String computerSkills) {
        if (computerSkills == null || computerSkills.isBlank()) {
            throw new IllegalArgumentException("Skill shouldn't be empty");
        }
        if (this.computerSkills.contains(computerSkills)) {
            throw new IllegalArgumentException("This computer skill already exist");
        }
        this.computerSkills.add(computerSkills);
    }

    @Override
    public void removeSkill(String skill) {
        if (skill == null || skill.isBlank()) {
            throw new IllegalArgumentException("Skills cannot be empty");
        }
        if (this.computerSkills.size() - 1 <= 0) {
            throw new IllegalArgumentException("Cannot remove last skill");
        }
        if (!this.computerSkills.contains(skill)) {
            throw new IllegalArgumentException("No such skill");
        }
        this.computerSkills.remove(skill);
    }

    @Override
    public void addAppointment(Appointment app) {
        if (roles.contains(Role.DOCTOR)) {
            if (app == null) {
                throw new IllegalArgumentException("Appointment cannot be null");
            } else if (app.getDoctor() != this) {
                throw new IllegalArgumentException("not this appointment's doctor");
            }
            appointments.add(app);
        } else {
            throw new IllegalArgumentException("Cannot add appointment to a non-Doctor");
        }

    }

    @Override
    public void removeAppointment(Appointment app) {
        if (roles.contains(Role.DOCTOR)) {
            if (app == null) {
                throw new IllegalArgumentException("Appointment cannot be null");
            } else if (app.getDoctor() != this) {
                throw new IllegalArgumentException("not this appointment's doctor");
            } else if (appointments.contains(app)) {
                appointments.remove(app);
            }
        } else {
            throw new IllegalArgumentException("Cannot add appointment to a non-Doctor");
        }
    }

    /**
     * Derived attribute
     */
    @Transient
    public double calculateExperience() {
        DateTimeFormatter formatter1 = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate now = LocalDate.now();
        if (ChronoUnit.YEARS.between(LocalDate.parse(employmentDate.toString(), formatter1), now) < 1) {
            return 0;
        }
        return ChronoUnit.YEARS.between(LocalDate.parse(employmentDate.toString(), formatter1), now);
    }

}
