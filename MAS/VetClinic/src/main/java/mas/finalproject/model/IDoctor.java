package mas.finalproject.model;

public interface IDoctor {
    public void addCertificate(String cert);

    public void removeCertificate(String cert);

    public void addAppointment(Appointment app);

    public void removeAppointment(Appointment app);
}
