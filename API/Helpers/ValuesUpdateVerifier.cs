namespace API.Helpers;

public class ValuesUpdateVerifier 
{
    public Dictionary<string, (object OldValue, object NewValue)> GetModifiedProperties<T1, T2>(T2 newValueObject, T1 oldValueObject)
    {
        var modifiedProperties = new Dictionary<string, (object OldValue, object NewValue)>();

        foreach (var property in typeof(T2).GetProperties())
        {
            var newValue = property.GetValue(newValueObject);

            var oldValue = typeof(T1).GetProperty(property.Name)?.GetValue(oldValueObject);

            if(newValue != null && !newValue.Equals(oldValue) && property.Name != "Log"){
                modifiedProperties[property.Name] = (oldValue, newValue);
            }
        }

        return modifiedProperties;
    }
}