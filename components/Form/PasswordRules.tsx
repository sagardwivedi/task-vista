import { FormDescription } from '../ui/form';

export function PasswordRules() {
    return (
        <div>
            <FormDescription>
                Choose a strong and secure password that meets the following
                criteria:
            </FormDescription>
            <ul className="ml-4 list-item list-outside list-disc">
                <li>
                    <FormDescription>
                        At least 8 characters in length
                    </FormDescription>
                </li>
                <li>
                    <FormDescription>
                        Include a mix of uppercase and lowercase letters
                    </FormDescription>
                </li>
                <li>
                    <FormDescription>
                        Use numbers and special characters
                    </FormDescription>
                </li>
                <li>
                    <FormDescription>
                        Avoid common words and easily guessable information{' '}
                    </FormDescription>
                </li>
                <li>
                    <FormDescription>
                        Avoid personal information and easily accessible details
                    </FormDescription>
                </li>
                <li>
                    <FormDescription>
                        Use a unique password for each account
                    </FormDescription>
                </li>
            </ul>
        </div>
    );
}
