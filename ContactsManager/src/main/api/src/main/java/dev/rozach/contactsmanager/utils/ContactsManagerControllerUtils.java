package dev.rozach.contactsmanager.utils;

import dev.rozach.contactsmanager.Config;

import java.util.Arrays;
import java.util.stream.Collectors;

public class ContactsManagerControllerUtils {
    private static String capitalize(String value) {
        return value.substring(0, 1).toUpperCase() + value.substring(1).toLowerCase();
    }
    public static String tryToFormatName(String name) {
        if (name == null || name.trim().length() < 2) return null;
        return Arrays.stream(name.length() > Config.MAX_NAME_LENGTH ? name.substring(0, Config.MAX_NAME_LENGTH).split(" ") : name.split(" "))
                .map(value -> capitalize(value) + " ")
                .collect(Collectors.joining()).trim();
    }

    public static String tryToFormatTeam(String team) {
        if (team == null || team.length() < 1) return null;
        return capitalize(team.length() > Config.MAX_TEAM_LENGTH ? team.substring(0, Config.MAX_TEAM_LENGTH) : team);
    }

    public static String tryToFormatTitle(String title) {
        if (title == null || title.length() < 1) return null;
        return capitalize(title.length() > Config.MAX_TITLE_LENGTH ? title.substring(0, Config.MAX_TITLE_LENGTH) : title);
    }

    public static String tryToFormatEmail(String email) {
        if (email == null || email.length() < 1) return null;
        // TODO EMAIL Pattern pruefen
        return email.length() > Config.MAX_EMAIL_LENGTH ? email.substring(0, Config.MAX_EMAIL_LENGTH) : email;
    }

    public static String tryToFormatPhoneNumber(String phoneNumber) {
        if (phoneNumber == null || phoneNumber.length() < 3) return null;
        // TODO Ziffern kontrollieren
        return phoneNumber.length() > Config.MAX_PHONE_NUMBER_LENGTH ? phoneNumber.substring(0, Config.MAX_PHONE_NUMBER_LENGTH) : phoneNumber;
    }

    public static String tryToFormatImageURL(String imageURL) {
        if (imageURL == null || imageURL.length() < 3) return null;
        // TODO Ziffern kontrollieren
        return imageURL.length() > Config.MAX_IMAGE_URL_LENGTH ? imageURL.substring(0, Config.MAX_IMAGE_URL_LENGTH) : imageURL;
    }
}
